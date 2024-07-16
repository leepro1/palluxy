package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.entity.Group;
import com.palluxy.domain.user.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/group")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @GetMapping("")
    public ResponseEntity<?> getGroups() {
        List<Group> findGroups = groupService.findAllGroups();

        if (findGroups == null || findGroups.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(findGroups, HttpStatus.OK);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<?> getGroupDetail(@PathVariable("groupId") Long groupId) {
        Group findGroup = groupService.findById(groupId);

        if (findGroup == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(findGroup, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createGroup(@RequestBody Group group) {
        Group savedGroup = groupService.createGroup(group);

        return null;
    }

    @PatchMapping("/{groupId}")
    public ResponseEntity<?> updateGroup(@PathVariable("groupId") Long groupId) {
        return null;
    }

    @PostMapping("/join")
    public ResponseEntity<?> createJoin() {
        return null;
    }

    @DeleteMapping("/join")
    public ResponseEntity<?> cancelJoin() {
        return null;
    }
}
