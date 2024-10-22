package com.palluxy.domain.group.controller;

import com.palluxy.domain.group.dto.ConnectionRequest;
import com.palluxy.domain.group.dto.SessionRequest;
import com.palluxy.domain.group.entity.Action;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.GroupHistory;
import com.palluxy.domain.group.entity.GroupUser;
import com.palluxy.domain.group.service.GroupHistoryService;
import com.palluxy.domain.group.service.GroupService;
import com.palluxy.domain.group.service.GroupUserService;
import com.palluxy.domain.group.service.OpenviduService;
import com.palluxy.global.common.data.CommonResponse;
import com.palluxy.domain.user.entity.User;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sessions")
public class SessionController {

    private final OpenviduService openviduService;
    private final GroupService groupService;
    private final GroupUserService groupUserService;
    private final GroupHistoryService groupHistoryService;

    @PostMapping("")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> createSession(@RequestBody SessionRequest sessionRequest) {
        Group group = groupService.findById(sessionRequest.groupId());
        groupService.validateApproveKey(group, sessionRequest.approveKey());
        Session session = openviduService.createSession(sessionRequest.params());
        groupHistoryService.createHistory(
            new GroupHistory(group.getLeader(), group, Action.CREATE));

        return CommonResponse.ok(
            "Session successfully created and sessionId ready to be used", session.getSessionId());
    }

    @PostMapping("/{sessionId}/connections")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> createConnection(
        @PathVariable("sessionId") String sessionId,
        @RequestBody ConnectionRequest connectionRequest) {
        GroupUser groupUser = groupUserService.findByGroupIdAndUserId(connectionRequest.groupId(),
            connectionRequest.userId());
        groupService.validateUser(groupUser);

        Session session = openviduService.getSession(sessionId);
        Connection connection = openviduService.createConnection(session,
            connectionRequest.params());
        groupHistoryService.createHistory(
            new GroupHistory(groupUser.getUser(), groupUser.getGroup(), Action.JOIN));

        return CommonResponse.ok(
            "The Connection has been successfully created. If it is of type WEBRTC, its token can now be used to connect a final user. If it is of type IPCAM, every participant will immediately receive the proper events in OpenVidu Browser: connectionCreated identifying the new IP camera Connection and streamCreated so they can subscribe to the IP camera stream.",
            connection.getToken());
    }

    @PostMapping("/{sessionId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> closeSession(@PathVariable("sessionId") String sessionId) {
        Session session = openviduService.getSession(sessionId);
        openviduService.closeSession(session);

        return CommonResponse.ok(
            "The Session has been successfully closed. Every participant will have received the proper events in OpenVidu Browser: streamDestroyed, connectionDestroyed and sessionDisconnected, all of them with \"reason\" property set to \"sessionClosedByServer\". Depending on the order of eviction of the users, some of them will receive more events than the others: the first user evicted will only receive the events related to himself, last one will receive every possible event");
    }

    @PostMapping("/{sessionId}/connection/{connectionId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> disconnect(
        @PathVariable("sessionId") String sessionId,
        @PathVariable("connectionId") String connectionId,
        @RequestBody ConnectionRequest connectionRequest) {
        Session session = openviduService.getSession(sessionId);
        Connection connection = openviduService.getConnection(session, connectionId);
        openviduService.disconnection(session, connection);

        GroupUser groupUser = groupUserService.findByGroupIdAndUserId(connectionRequest.groupId(),
            connectionRequest.userId());
        Group group = groupUser.getGroup();
        User user = groupUser.getUser();

        if (connectionRequest.isBanned()) {
            groupUserService.updateIsBanned(groupUser);
            groupHistoryService.createHistory(new GroupHistory(user, group, Action.EXPEL));
            return CommonResponse.ok("정상적으로 강퇴되었음");
        }

        groupHistoryService.createHistory(new GroupHistory(user, group, Action.CLOSE));
        return CommonResponse.ok("정상적으로 퇴장되었음");
    }
}
