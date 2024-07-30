package com.palluxy.domain.report.entity;

import com.palluxy.global.common.data.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
public class GuestBookReport {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String description;
  private Status status;
  @CreationTimestamp
  private LocalDateTime createdAt;

  private Long reportFrom;
  private Long reportTo;
  private Long guestBooKId;
  private Long commentId;
}
