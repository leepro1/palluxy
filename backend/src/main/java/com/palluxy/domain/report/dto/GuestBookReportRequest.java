package com.palluxy.domain.report.dto;

import lombok.Getter;

@Getter
public class GuestBookReportRequest {
  private String description;
  private Long guestBookId;
  private Long commentId;
  private Long reportFrom;
  private Long reportTo;
}
