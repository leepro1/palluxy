package com.palluxy.domain.report.entity;

import com.palluxy.domain.report.dto.RoomReportRequest;
import com.palluxy.domain.admin.dto.Status;
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
public class RoomReport extends Report {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String description;
  private Status status;
  @CreationTimestamp
  private LocalDateTime createdAt;

  private Long reportFrom;
  private Long reportTo;
  private Long roomId;

  @Builder
  public RoomReport(Long id, String description, Status status, LocalDateTime createdAt,
      Long reportFrom, Long reportTo, Long roomId) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.reportFrom = reportFrom;
    this.reportTo = reportTo;
    this.roomId = roomId;
  }

  public static RoomReport of (RoomReportRequest roomReportRequest) {
    return RoomReport.builder()
        .description(roomReportRequest.getDescription())
        .status(Status.WAIT)
        .reportFrom(roomReportRequest.getReportFrom())
        .reportTo(roomReportRequest.getReportTo())
        .roomId(roomReportRequest.getRoomId())
        .build();
  }
}
