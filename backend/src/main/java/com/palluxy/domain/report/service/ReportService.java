package com.palluxy.domain.report.service;

import com.palluxy.domain.report.entity.GuestBookReport;
import com.palluxy.domain.report.entity.RoomReport;
import com.palluxy.domain.report.repository.GuestBookRepository;
import com.palluxy.domain.report.repository.RoomReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {

  private final GuestBookRepository guestBookRepository;
  private final RoomReportRepository roomReportRepository;

  public void createGuestBookReport(GuestBookReport guestBookReport) {
    isValidGuestBookReport(guestBookReport);
    guestBookRepository.saveAndFlush(guestBookReport);
  }

  public void createRoomReport(RoomReport roomReport) {
    isValidRoomReport(roomReport);
    roomReportRepository.saveAndFlush(roomReport);
  }

  public void isValidGuestBookReport(GuestBookReport guestBookReport) {

  }

  public void isValidRoomReport(RoomReport roomReport) {

  }

  public void isValidUser(Long userId) {

  }

  public void isValidComment(Long commentId, Long guestBookId) {

  }

  public void isValidRoom(Long roomId) {

  }
}
