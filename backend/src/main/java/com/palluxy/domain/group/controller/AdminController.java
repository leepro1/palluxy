package com.palluxy.domain.group.controller;

import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.Status;
import com.palluxy.domain.group.service.GroupService;
import com.palluxy.domain.group.util.GroupUtil;
import com.palluxy.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

  private final GroupService groupService;
  private final GroupUtil groupUtil;

  @PatchMapping("/group/accept")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> approveGroup(@RequestBody Map<String, Long> request) {
    Group findGroup = groupService.findById(request.get("groupId"));
    String key = groupUtil.generateKey();
    groupService.updateGroupByAdmin(findGroup, Status.ACCEPT, key);

    return CommonResponse.ok("그룹이 정상적으로 승인되었음");
  }

  @PatchMapping("/group/reject")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> rejectGroup(@RequestBody Map<String, Long> request) {
    Group findGroup = groupService.findById(request.get("groupId"));
    groupService.updateGroupByAdmin(findGroup, Status.REJECT, "");

    return CommonResponse.ok("그룹이 정상적으로 승인거부되었음");
  }
}
