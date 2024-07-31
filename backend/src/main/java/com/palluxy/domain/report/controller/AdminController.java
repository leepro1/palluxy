package com.palluxy.domain.report.controller;

import com.palluxy.domain.report.dto.ReportResponses;
import com.palluxy.domain.group.dto.Status;
import com.palluxy.domain.report.entity.GuestBookReport;
import com.palluxy.domain.report.entity.RoomReport;
import com.palluxy.domain.report.service.ReportService;
import com.palluxy.global.common.data.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/report")
@RequiredArgsConstructor
public class AdminController {

  private final ReportService reportService;

  @GetMapping("/report/room/{status}/{pageNumber}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getRoomReportByStatus(@PathVariable("status") String strStatus, @PathVariable("pageNumber") int pageNumber) {
    Status status = Status.of(strStatus);
    Pageable pageable = PageRequest.of(pageNumber, 10);

    ReportResponses<RoomReport> reports = reportService.findRoomReportByStatus(status, pageable);
    return CommonResponse.ok("정상적으로 추억공간 신고가 조회됨", reports);
  }

  @PatchMapping("/report/room/accept/{reportId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> acceptRoomReport(@PathVariable("reportId") Long reportId) {
    return null;
  }

  @PatchMapping("/report/room/reject/{reportId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> rejectRoomReport(@PathVariable("reportId") Long reportId) {
    return null;
  }

  @GetMapping("/report/guestbook/{status}/{pageNumber}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getGuestRoomReportByStatus(@PathVariable("status") String strStatus, @PathVariable("pageNumber") int pageNumber) {
    Status status = Status.of(strStatus);
    Pageable pageable = PageRequest.of(pageNumber, 10);

    ReportResponses<GuestBookReport> reports = reportService.findGuestBookReportByStatus(status, pageable);
    return CommonResponse.ok("정상적으로 방명록 신고가 조회됨", reports);
  }

  @PatchMapping("/report/guestbook/accept/{reportId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> acceptGuestBookReport(@PathVariable("reportId") Long reportId) {
    return null;
  }

  @PatchMapping("/report/guestbook/reject/{reportId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> rejectGuestBookReport(@PathVariable("reportId") Long reportId) {
    return null;
  }

}
