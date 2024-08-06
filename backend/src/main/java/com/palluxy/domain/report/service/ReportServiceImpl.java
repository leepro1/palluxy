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
public class ReportServiceImpl implements ReportService {

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

    public ReportResponses<GuestBookReport> findGuestBookReportByStatus(Status status,
        Pageable pageable) {
        Page<GuestBookReport> guestBookReports = guestBookRepository.findByStatus(status, pageable);
        return new ReportResponses<>(guestBookReports.getContent(),
            guestBookReports.getTotalPages());
    }

    public void updateGuestBookReport(Long reportId, Status status) {
        GuestBookReport guestBookReport = getGuestBookReport(reportId);
        guestBookReport.updateStatus(status);
        if (status.equals(Status.ACCEPT)) {
            banUser(guestBookReport.getReportTo());
        }
        guestBookRepository.saveAndFlush(guestBookReport);
    }

    public void updateRoomReport(Long reportId, Status status) {
        RoomReport roomReport = getRoomReport(reportId);
        roomReport.updateStatus(status);
        if (status.equals(Status.ACCEPT)) {
            banUser(roomReport.getReportTo());
        }
        roomReportRepository.saveAndFlush(roomReport);
    }

    public void banUser(Long userId) {
        User user = getUser(userId);
        user.updateIsBanned();
        userRepository.saveAndFlush(user);
    }

    private RoomReport getRoomReport(Long reportId) {
        Optional<RoomReport> roomReport = roomReportRepository.findById(reportId);
        if (roomReport.isEmpty()) {
            throw new NotFoundException("roomReport");
        }
        return roomReport.get();
    }

    private GuestBookReport getGuestBookReport(Long reportId) {
        Optional<GuestBookReport> guestBookReport = guestBookRepository.findById(reportId);
        if (guestBookReport.isEmpty()) {
            throw new NotFoundException("guestBookReport");
        }

        return guestBookReport.get();
    }

    private User getUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new NotFoundException("user");
        }

        return user.get();
    }

    private void isValidGuestBookReport(GuestBookReport guestBookReport) {
        isValidUser(guestBookReport.getReportTo());
        isValidUser(guestBookReport.getReportFrom());
        isValidComment(guestBookReport.getCommentId());
    }

    private void isValidRoomReport(RoomReport roomReport) {
        isValidUser(roomReport.getReportTo());
        isValidUser(roomReport.getReportFrom());
        isValidRoom(roomReport.getRoomId());
    }

    private void isValidUser(Long userId) {
        Optional<User> findUser = userRepository.findById(userId);
        if (findUser.isEmpty()) {
            throw new NotFoundException("user");
        }
    }

    private void isValidComment(Long commentId) {
        Optional<Comment> findComment = commentRepository.findById(commentId);
        if (findComment.isEmpty()) {
            throw new NotFoundException("comment");
        }
    }

    private void isValidRoom(Long roomId) {
        Optional<Room> findRoom = roomRepository.findById(roomId);
        if (findRoom.isEmpty()) {
            throw new NotFoundException("room");
        }
    }
}
