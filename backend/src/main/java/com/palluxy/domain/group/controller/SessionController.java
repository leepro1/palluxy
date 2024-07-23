package com.palluxy.domain.group.controller;

import com.palluxy.domain.group.entity.Action;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.GroupHistory;
import com.palluxy.domain.group.entity.GroupUser;
import com.palluxy.domain.group.service.GroupService;
import com.palluxy.domain.group.service.OpenviduService;
import com.palluxy.domain.group.util.GroupUtil;
import com.palluxy.global.common.CommonResponse;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class
SessionController {

  private final OpenviduService openviduService;
  private final GroupService groupService;
  private final GroupUtil groupUtil;

  @PostMapping("/api/sessions")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> createSession(@RequestBody Map<String, Object> params) {
    Group group = groupService.findById((Long) params.get("groupId"));
    groupUtil.validateApproveKey(group, String.valueOf(params.get("approveKey")));
    Session session = openviduService.createSession(params);
    groupService.createHistory(
        new GroupHistory((Long) params.get("userId"), (Long) params.get("groupId"), Action.CREATE));

    return CommonResponse.ok(
        "Session successfully created and sessionId ready to be used", session.getSessionId());
  }

  @PostMapping("/api/sessions/{sessionId}/connections")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> createConnection(
      @PathVariable("sessionId") String sessionId, @RequestBody Map<String, Object> params) {
    GroupUser groupUser =
        groupService.findByGroupIdAndUserId(
            (Long) params.get("groupId"), (Long) params.get("userId"));
    groupUtil.validateUser(groupUser);

    Session session = openviduService.getSession(sessionId);
    Connection connection = openviduService.createConnection(session, params);
    groupService.createHistory(
        new GroupHistory((Long) params.get("userId"), (Long) params.get("groupId"), Action.JOIN));

    return CommonResponse.ok(
        "The Connection has been successfully created. If it is of type WEBRTC, its token can now be used to connect a final user. If it is of type IPCAM, every participant will immediately receive the proper events in OpenVidu Browser: connectionCreated identifying the new IP camera Connection and streamCreated so they can subscribe to the IP camera stream.",
        connection.getToken());
  }

  @PostMapping("/api/sessions/{sessionId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> closeSession(@PathVariable("sessionId") String sessionId) {
    Session session = openviduService.getSession(sessionId);
    openviduService.closeSession(session);

    return CommonResponse.ok(
        "The Session has been successfully closed. Every participant will have received the proper events in OpenVidu Browser: streamDestroyed, connectionDestroyed and sessionDisconnected, all of them with \"reason\" property set to \"sessionClosedByServer\". Depending on the order of eviction of the users, some of them will receive more events than the others: the first user evicted will only receive the events related to himself, last one will receive every possible event");
  }

  @PostMapping("/api/sessions/{sessionId}/connection/{connectionId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> disconnect(
      @PathVariable("sessionId") String sessionId,
      @PathVariable("connectionId") String connectionId,
      @RequestBody Map<String, Object> params) {
    Session session = openviduService.getSession(sessionId);
    Connection connection = openviduService.getConnection(session, connectionId);
    openviduService.disconnection(session, connection);

    Long groupId = (Long) params.get("groupId");
    Long userId = (Long) params.get("userId");
    if ((Boolean) params.get("isBanned")) {
      Set<GroupUser> groupUsers = groupService.findById(groupId).getGroupUser();
      for (GroupUser groupUser : groupUsers) {
        if (Objects.equals(groupUser.getId(), userId)) {
          groupUser.setBanned(true);
        }
      }
      groupService.createHistory(new GroupHistory(userId, groupId, Action.EXPEL));
    } else {
      groupService.createHistory(new GroupHistory(userId, groupId, Action.CLOSE));
    }

    return CommonResponse.ok(
        "The Connection has been successfully removed from the session. Every participant will have received the proper events in OpenVidu Browser: streamDestroyed if the user was publishing, connectionDestroyed for the remaining users and sessionDisconnected for the evicted user. All of them with \"reason\" property set to \"forceDisconnectByServer\".\n"
            + "If the CONNECTION_ID belongs to a Connection in pending status, it has been successfully invalidated and its token can no longer be used.");
  }
}
