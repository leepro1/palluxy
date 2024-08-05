package com.palluxy.domain.group.controller;

import com.palluxy.domain.email.service.EmailService;
import com.palluxy.domain.group.service.GroupService;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.global.common.data.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/group")
@RequiredArgsConstructor
public class AdminGroupController {

  private final GroupService groupService;
  private final EmailService emailService;

  @PatchMapping("/group/accept/{groupId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> approveGroup(@PathVariable("groupId") Long groupId) {
    Group group = groupService.approveGroup(groupId);
    String to = groupService.getUserEmail(group.getLeader().getId());
    emailService.sendVerificationCode("group", to, group.getApproveKey(), group.getTitle());
    return CommonResponse.ok("그룹이 정상적으로 승인되었음");

  }

  @PatchMapping("/group/reject/{groupId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> rejectGroup(@PathVariable("groupId") Long groupId) {
    groupService.rejectGroup(groupId);
    return CommonResponse.ok("그룹이 정상적으로 승인거부되었음");
  }
}
