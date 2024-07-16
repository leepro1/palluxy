package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.service.OpenviduService;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class SessionController {

    private final OpenviduService openviduService;

    @PostMapping("/api/sessions")
    public ResponseEntity<?> createSession(@RequestBody Map<String, Object> params) {
        Session session = openviduService.createSession(params);

        if (session == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<?> createConnection(@PathVariable("sessionId") String sessionId, @RequestBody(required = false) Map<String, Object> params) {
        Session session = openviduService.getSession(sessionId);

        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Connection connection = openviduService.createConnection(session, params);

        if (connection == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    @PostMapping("/api/sessions/{sessionId}")
    public ResponseEntity<?> closeSession(@PathVariable("sessionId") String sessionId) {

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

    @PostMapping("/api/sessions/{sessionId}/connection/{connectionId}")
    public ResponseEntity<?> disconnect(@PathVariable("sessionId") String sessionId, @PathVariable("connectionId") String connectionId) {
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
