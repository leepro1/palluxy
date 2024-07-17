package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.entity.Action;
import com.palluxy.domain.user.entity.Group;
import com.palluxy.domain.user.entity.GroupHistory;
import com.palluxy.domain.user.entity.GroupUser;
import com.palluxy.domain.user.exception.NotFoundException;
import com.palluxy.domain.user.exception.ValidateException;
import com.palluxy.domain.user.service.GroupService;
import com.palluxy.domain.user.service.OpenviduService;
import com.palluxy.global.common.CommonResponse;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.Session;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class SessionController {

    private final OpenviduService openviduService;
    private final GroupService groupService;

    @PostMapping("/api/sessions")
    public CommonResponse<?> createSession(@RequestBody(required = false) Map<String, Object> params, @RequestBody Long userId, @RequestBody Long groupId, @RequestBody String approveKey) {
        Session session = null;

        try {
            Group group = groupService.findById(groupId);
            groupService.validateApproveKey(group, approveKey);
            session = openviduService.createSession(params);

            groupService.createHistory(new GroupHistory(userId, groupId, Action.CREATE));
        } catch (NotFoundException | ValidateException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("Session successfully created and sessionId ready to be used", session.getSessionId());
    }

    @PostMapping("/api/sessions/{sessionId}/connections")
    public CommonResponse<?> createConnection(@PathVariable("sessionId") String sessionId, @RequestBody(required = false) Map<String, Object> params, @RequestBody Long userId, @RequestBody Long groupId) {
        Connection connection = null;

        try {
            GroupUser groupUser = groupService.findByGroupIdAndUserId(groupId, userId);
            if (groupUser.isBanned()) {
                return CommonResponse.ok("강제 퇴장 당한 유저는 재입장이 불가능합니다.");
            }

            Session session = openviduService.getSession(sessionId);
            connection = openviduService.createConnection(session, params);

            groupService.createHistory(new GroupHistory(userId, groupId, Action.JOIN));
        } catch (NotFoundException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("The Connection has been successfully created. If it is of type WEBRTC, its token can now be used to connect a final user. If it is of type IPCAM, every participant will immediately receive the proper events in OpenVidu Browser: connectionCreated identifying the new IP camera Connection and streamCreated so they can subscribe to the IP camera stream.",
                connection.getToken());
    }

    @PostMapping("/api/sessions/{sessionId}")
    public CommonResponse<?> closeSession(@PathVariable("sessionId") String sessionId, @RequestBody Long groupId, @RequestBody Long userId) {

        try {
            Session session = openviduService.getSession(sessionId);
            openviduService.closeSession(session);
        } catch (NotFoundException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("The Session has been successfully closed. Every participant will have received the proper events in OpenVidu Browser: streamDestroyed, connectionDestroyed and sessionDisconnected, all of them with \"reason\" property set to \"sessionClosedByServer\". Depending on the order of eviction of the users, some of them will receive more events than the others: the first user evicted will only receive the events related to himself, last one will receive every possible event");
    }

    @PostMapping("/api/sessions/{sessionId}/connection/{connectionId}")
    public CommonResponse<?> disconnect(@PathVariable("sessionId") String sessionId, @PathVariable("connectionId") String connectionId,  @RequestBody Long groupId, @RequestBody Long userId, @RequestBody boolean isBanned) {

        try {
            Session session = openviduService.getSession(sessionId);
            Connection connection = openviduService.getConnection(session, connectionId);
            openviduService.disconnection(session, connection);

            if (isBanned) {
                Set<GroupUser> groupUsers = groupService.findById(groupId).getGroupUser();
                for (GroupUser groupUser : groupUsers) {
                    if (groupUser.getId() == userId) {
                        groupUser.setBanned(true);
                    }
                }
                groupService.createHistory(new GroupHistory(userId, groupId, Action.EXPEL));
            } else {
                groupService.createHistory(new GroupHistory(userId, groupId, Action.CLOSE));
            }

        } catch (NotFoundException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("The Connection has been successfully removed from the session. Every participant will have received the proper events in OpenVidu Browser: streamDestroyed if the user was publishing, connectionDestroyed for the remaining users and sessionDisconnected for the evicted user. All of them with \"reason\" property set to \"forceDisconnectByServer\".\n" +
                "If the CONNECTION_ID belongs to a Connection in pending status, it has been successfully invalidated and its token can no longer be used.");
    }
}
