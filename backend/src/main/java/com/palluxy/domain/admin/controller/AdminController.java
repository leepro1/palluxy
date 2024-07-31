package com.palluxy.domain.admin.controller;

import com.palluxy.domain.admin.dto.ReportResponses;
import com.palluxy.domain.admin.dto.Status;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.report.entity.RoomReport;
import com.palluxy.global.common.data.CommonResponse;
import com.palluxy.domain.admin.service.AdminService;
import com.palluxy.domain.email.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

  private final AdminService adminService;
  private final EmailService emailService;

  @PatchMapping("/group/accept/{groupId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> approveGroup(@PathVariable("groupId") Long groupId) {
    Group group = adminService.approveGroup(groupId);
    String to = adminService.getUserEmail(group.getLeader().getId());
    emailService.sendVerificationCode("group", to, group.getApproveKey(), group.getTitle());
    return CommonResponse.ok("그룹이 정상적으로 승인되었음");

  }

  @PatchMapping("/group/reject/{groupId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> rejectGroup(@PathVariable("groupId") Long groupId) {
    adminService.rejectGroup(groupId);
    return CommonResponse.ok("그룹이 정상적으로 승인거부되었음");
  }

  @GetMapping("/report/room/{status}/{pageNumber}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getRoomReportByStatus(@PathVariable("type") String type, @PathVariable("status") String strStatus, @PathVariable("pageNumber") int pageNumber) {
    Status status = Status.of(strStatus);
    Pageable pageable = PageRequest.of(pageNumber, 10);

    ReportResponses<RoomReport> reports = adminService.findRoomReportByStatus(status);
    return CommonResponse.ok("정상적으로 추억공간 신고가 조회됨", reports);
  }

}
