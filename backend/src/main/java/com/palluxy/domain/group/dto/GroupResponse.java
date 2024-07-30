package com.palluxy.domain.group.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.palluxy.domain.group.entity.Group;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class GroupResponse {
  private Long id;
  private Long leaderId;
  private String leaderNickname;
  private String title;
  private String description;
  private String filePath;
  private LocalDateTime startTime;
  private LocalDateTime endTime;
  private int maxCapacity;
  private int remainCapacity;

  @Builder
  public GroupResponse(Long id, Long leaderId, String leaderNickname, String title, String description, String filePath,
      LocalDateTime startTime, LocalDateTime endTime, int maxCapacity, int remainCapacity) {
    this.id = id;
    this.leaderId = leaderId;
    this.leaderNickname = leaderNickname;
    this.title = title;
    this.description = description;
    this.filePath = filePath;
    this.startTime = startTime;
    this.endTime = endTime;
    this.maxCapacity = maxCapacity;
    this.remainCapacity = remainCapacity;
  }

  public static GroupResponse of (Group group) {
    return GroupResponse.builder()
        .id(group.getId())
        .leaderId(group.getLeader().getId())
        .leaderNickname(group.getLeader().getNickname())
        .title(group.getTitle())
        .description(group.getDescription())
        .filePath(group.getFilePath())
        .startTime(group.getStartTime())
        .endTime(group.getEndTime())
        .maxCapacity(group.getMaxCapacity())
        .remainCapacity(group.getRemainingCapacity())
        .build();
  }
}
