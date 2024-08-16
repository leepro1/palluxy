package com.palluxy.domain.report.entity;

import com.palluxy.domain.report.dto.GuestBookReportRequest;
import com.palluxy.domain.group.dto.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GuestBookReport extends Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long guestBooKId;
    private Long commentId;

    private String description;
    private Status status;
    private Long reportFrom;
    private Long reportTo;

    @Builder
    public GuestBookReport(Long id, String description, Status status,
        Long reportFrom, Long reportTo, Long guestBooKId, Long commentId) {
        this.id = id;
        this.description = description;
        this.status = status;
        this.reportFrom = reportFrom;
        this.reportTo = reportTo;
        this.guestBooKId = guestBooKId;
        this.commentId = commentId;
    }

    public static GuestBookReport of(GuestBookReportRequest guestBookReportRequest) {
        return GuestBookReport.builder()
            .description(guestBookReportRequest.description())
            .status(Status.WAIT)
            .reportFrom(guestBookReportRequest.reportFrom())
            .reportTo(guestBookReportRequest.reportTo())
            .commentId(guestBookReportRequest.commentId())
            .guestBooKId(guestBookReportRequest.guestBookId())
            .build();
    }

    public void updateStatus(Status status) {
        this.status = status;
    }
}
