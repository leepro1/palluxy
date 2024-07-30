package com.palluxy.domain.report.dto;

import lombok.Getter;

@Getter
public class RoomReportRequest {
  private String description;
  private Long reportFrom;
  private Long reportTo;
  private Long roomId;
}
