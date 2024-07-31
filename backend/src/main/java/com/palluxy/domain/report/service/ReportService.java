package com.palluxy.domain.report.service;

import com.palluxy.domain.report.dto.ReportResponses;
import com.palluxy.domain.group.dto.Status;
import com.palluxy.domain.memoryRoom.guestbook.entity.Comment;
import com.palluxy.domain.memoryRoom.guestbook.repository.CommentRepository;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import com.palluxy.domain.report.entity.GuestBookReport;
import com.palluxy.domain.report.entity.RoomReport;
import com.palluxy.domain.report.repository.GuestBookRepository;
import com.palluxy.domain.report.repository.RoomReportRepository;
import com.palluxy.domain.user.entity.User;
import com.palluxy.domain.user.repository.UserRepository;
import com.palluxy.global.common.error.NotFoundException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {

  private final GuestBookRepository guestBookRepository;
  private final RoomReportRepository roomReportRepository;
  private final UserRepository userRepository;
  private final CommentRepository commentRepository;
  private final RoomRepository roomRepository;

  public void createGuestBookReport(GuestBookReport guestBookReport) {
    isValidGuestBookReport(guestBookReport);
    guestBookRepository.saveAndFlush(guestBookReport);
  }

  public void createRoomReport(RoomReport roomReport) {
    isValidRoomReport(roomReport);
    roomReportRepository.saveAndFlush(roomReport);
  }

  public ReportResponses<RoomReport> findRoomReportByStatus(Status status, Pageable pageable) {
    Page<RoomReport> roomReports = roomReportRepository.findByStatus(status, pageable);
    return new ReportResponses<>(roomReports.getContent(), roomReports.getTotalPages());
  }

  public ReportResponses<GuestBookReport> findGuestBookReportByStatus(Status status, Pageable pageable) {
    Page<GuestBookReport> guestBookReports = guestBookRepository.findByStatus(status, pageable);
    return new ReportResponses<>(guestBookReports.getContent(), guestBookReports.getTotalPages());
  }

  public void isValidGuestBookReport(GuestBookReport guestBookReport) {
    isValidUser(guestBookReport.getReportTo());
    isValidUser(guestBookReport.getReportFrom());
    isValidComment(guestBookReport.getCommentId());
  }

  public void isValidRoomReport(RoomReport roomReport) {
    isValidUser(roomReport.getReportTo());
    isValidUser(roomReport.getReportFrom());
    isValidRoom(roomReport.getRoomId());
  }

  public void isValidUser(Long userId) {
    Optional<User> findUser = userRepository.findById(userId);
    if (!findUser.isPresent()) {
      throw new NotFoundException("user");
    }
  }

  public void isValidComment(Long commentId) {
    Optional<Comment> findComment = commentRepository.findById(commentId);
    if (!findComment.isPresent()) {
      throw new NotFoundException("comment");
    }
  }

  public void isValidRoom(Long roomId) {
    Optional<Room> findRoom = roomRepository.findById(roomId);
    if (!findRoom.isPresent()) {
      throw new NotFoundException("room");
    }
  }
}
