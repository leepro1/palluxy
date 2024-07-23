package com.palluxy.domain.group.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GroupResponse {
  private Long id;
  private String title;
  private String description;
  private String filePath;
  private LocalDateTime startTime;
  private LocalDateTime endTime;
  private int maxCapacity;
  private int remainingCapacity;

  public GroupResponse() {}

  public GroupResponse(
      Long id,
      String title,
      String description,
      String filePath,
      LocalDateTime startTime,
      LocalDateTime endTime,
      int maxCapacity,
      int remainingCapacity) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.filePath = filePath;
    this.startTime = startTime;
    this.endTime = endTime;
    this.maxCapacity = maxCapacity;
    this.remainingCapacity = remainingCapacity;
  }
}
