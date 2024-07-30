package com.palluxy.domain.report.controller;

import com.palluxy.domain.report.dto.GuestBookReportRequest;
import com.palluxy.domain.report.dto.RoomReportRequest;
import com.palluxy.domain.report.entity.GuestBookReport;
import com.palluxy.domain.report.entity.RoomReport;
import com.palluxy.domain.report.service.ReportService;
import com.palluxy.global.common.data.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {

  private final ReportService reportService;

  @PostMapping("/room")
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<?> createRoomReport(@RequestBody RoomReportRequest roomReportRequest) {
    reportService.createRoomReport(RoomReport.of(roomReportRequest));
    return CommonResponse.created("추억공간 신고가 정상적으로 생성되었음");
  }

  @PostMapping("/comment")
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<?> createCommentReport(@RequestBody GuestBookReportRequest guestBookReportRequest) {
    reportService.createGuestBookReport(GuestBookReport.of(guestBookReportRequest));
    return CommonResponse.created("방명록 신고가 정상적으로 생성되었음");
  }
}
