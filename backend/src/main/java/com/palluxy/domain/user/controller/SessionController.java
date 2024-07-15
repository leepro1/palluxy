package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.entity.Group;
import com.palluxy.domain.user.service.GroupService;
import com.palluxy.domain.user.service.OpenviduService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/session")
public class SessionController {

    private OpenviduService openviduService;
    private GroupService groupService;

    public SessionController(OpenviduService openviduService, GroupService groupService) {
        this.openviduService = openviduService;
        this.groupService = groupService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createSession(@RequestBody Group group, @RequestBody Map<String, Object> params) {
        Group findGroup = groupService.findGroup(group.getId());

        if (findGroup == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (!findGroup.getApproveKey().equals(group.getApproveKey())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        String sessionId = openviduService.createSession(params);

        Map<String, String> result = new HashMap<>();
        result.put("sessionId", sessionId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/connect")
    public ResponseEntity<?> createConnection(@RequestBody String sessionId, @RequestBody Map<String, Object> params) {
        String token = openviduService.getToken(sessionId, params);

        if (token == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Map<String, String> result = new HashMap<>();
        result.put("token", token);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
