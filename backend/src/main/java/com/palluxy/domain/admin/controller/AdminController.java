package com.palluxy.domain.admin.controller;

import com.palluxy.domain.admin.service.AdminService;
import com.palluxy.domain.email.service.EmailService;
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

  private final AdminService adminService;
  private final EmailService emailService;

  @PatchMapping("/group/accept")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> approveGroup(@RequestBody Map<String, Long> request) {
    String key = adminService.generateKey();
    adminService.approveGroup(request.get("groupId"), key);

    String to = adminService.getUserEmail(request.get("userId"));
//    emailService.sendVerificationCode("group", to, key);
    return CommonResponse.ok("그룹이 정상적으로 승인되었음");
  }

  @PatchMapping("/group/reject")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> rejectGroup(@RequestBody Map<String, Long> request) {
    adminService.rejectGroup(request.get("groupId"));
    return CommonResponse.ok("그룹이 정상적으로 승인거부되었음");
  }
}
