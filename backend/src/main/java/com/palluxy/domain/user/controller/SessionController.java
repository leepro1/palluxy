package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.service.OpenviduService;
import com.palluxy.global.common.CommonResponse;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class SessionController {

    private final OpenviduService openviduService;

    @PostMapping("/api/sessions")
    public CommonResponse createSession(@RequestBody Map<String, Object> params) {
        Session session = openviduService.createSession(params);

        if (session == null) {
            return CommonResponse.badRequest("Problem with some body parameter");
        }

        return CommonResponse.ok("Session successfully created and sessionId ready to be used",session.getSessionId());
    }

    @PostMapping("/api/sessions/{sessionId}/connections")
    public CommonResponse createConnection(@PathVariable("sessionId") String sessionId, @RequestBody(required = false) Map<String, Object> params) {
        Session session = openviduService.getSession(sessionId);

        if (session == null) {
            return CommonResponse.badRequest("No session exists for the passed SESSION_ID");
        }

        Connection connection = openviduService.createConnection(session, params);

        if (connection == null) {
            return CommonResponse.badRequest("Problem with some body parameter");
        }

        return CommonResponse.ok("The Connection has been successfully created. If it is of type WEBRTC, its token can now be used to connect a final user. If it is of type IPCAM, every participant will immediately receive the proper events in OpenVidu Browser: connectionCreated identifying the new IP camera Connection and streamCreated so they can subscribe to the IP camera stream.",
                connection.getToken());
    }

    @PostMapping("/api/sessions/{sessionId}")
    public CommonResponse closeSession(@PathVariable("sessionId") String sessionId) {

        Session session = openviduService.getSession(sessionId);
        if (session == null){
            return CommonResponse.badRequest("No Session exists for the passed SESSION_ID");
        }

        openviduService.closeSession(session);

        return CommonResponse.ok("The Session has been successfully closed. Every participant will have received the proper events in OpenVidu Browser: streamDestroyed, connectionDestroyed and sessionDisconnected, all of them with \"reason\" property set to \"sessionClosedByServer\". Depending on the order of eviction of the users, some of them will receive more events than the others: the first user evicted will only receive the events related to himself, last one will receive every possible event");
    }

    @PostMapping("/api/sessions/{sessionId}/connection/{connectionId}")
    public CommonResponse disconnect(@PathVariable("sessionId") String sessionId, @PathVariable("connectionId") String connectionId) {
        Session session = openviduService.getSession(sessionId);
        if (session == null) {
            return CommonResponse.badRequest("No session exists for the passed SESSION_ID");
        }

        boolean result = openviduService.disconnection(session, connectionId);
        if(!result){
            return CommonResponse.badRequest("No Connection for the passed CONNECTION_ID");
        }

        return CommonResponse.ok("The Connection has been successfully removed from the session. Every participant will have received the proper events in OpenVidu Browser: streamDestroyed if the user was publishing, connectionDestroyed for the remaining users and sessionDisconnected for the evicted user. All of them with \"reason\" property set to \"forceDisconnectByServer\".\n" +
                "If the CONNECTION_ID belongs to a Connection in pending status, it has been successfully invalidated and its token can no longer be used.");
    }
}
