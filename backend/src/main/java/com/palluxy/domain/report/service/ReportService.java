package com.palluxy.domain.report.service;

import com.palluxy.domain.report.dto.ReportResponses;
import com.palluxy.domain.group.dto.Status;
import com.palluxy.domain.report.entity.GuestBookReport;
import com.palluxy.domain.report.entity.RoomReport;
import org.springframework.data.domain.Pageable;

public interface ReportService {

  void createGuestBookReport(GuestBookReport guestBookReport);

  void createRoomReport(RoomReport roomReport);

  ReportResponses<RoomReport> findRoomReportByStatus(Status status, Pageable pageable);

  ReportResponses<GuestBookReport> findGuestBookReportByStatus(Status status, Pageable pageable);

  void updateGuestBookReport(Long reportId, Status status);

  void updateRoomReport(Long reportId, Status status);

  void banUser(Long userId);
}
