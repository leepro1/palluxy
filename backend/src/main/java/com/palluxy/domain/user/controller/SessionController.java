package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.entity.Group;
import com.palluxy.domain.user.service.GroupService;
import com.palluxy.domain.user.service.OpenviduService;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.Session;
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
    public ResponseEntity<?> createSession(@RequestBody Map<String, Object> params) {
//        Group findGroup = groupService.findGroup(group.getId());
//
//        if (findGroup == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//
//        if (!findGroup.getApproveKey().equals(group.getApproveKey())) {
//            return new ResponseEntity<>(HttpStatus.CONFLICT);
//        }

        Session session = openviduService.createSession(params);

        if (session == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Map<String, String> result = new HashMap<>();
        result.put("sessionId", session.getSessionId());

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/connect")
    public ResponseEntity<?> createConnection(@RequestBody String sessionId, @RequestBody Map<String, Object> params) {
        Session session = openviduService.getSession(sessionId);

        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Connection connection = openviduService.createConnection(session, params);

        if (connection == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("connection", connection);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/close")
    public ResponseEntity<?> closeSession(@RequestBody String sessionId) {

        Session session = openviduService.getSession(sessionId);
        if (session == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        boolean result = openviduService.closeSession(session);
        if (!result) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/disconnect")
    public ResponseEntity<?> disconnect(@RequestBody String sessionId, @RequestBody String connectionId) {
        Session session = openviduService.getSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        boolean result = openviduService.disconnection(session, connectionId);
        if(!result){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
