package com.palluxy.domain.group.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.palluxy.domain.group.entity.Group;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.palluxy.domain.group.entity.GroupUser;
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
  private List<Long> groupUserId;

  @Builder
  public GroupResponse(Long id, Long leaderId, String leaderNickname, String title, String description, String filePath,
      LocalDateTime startTime, LocalDateTime endTime, int maxCapacity, int remainCapacity,
                       List<Long> groupUserId) {
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
    this.groupUserId = groupUserId;
  }

  public static GroupResponse of (Group group) {
    GroupResponse response = GroupResponse.builder()
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

    List<Long> groupUserId = new ArrayList<>();
    for (GroupUser user : group.getGroupUser()) {
      groupUserId.add(user.getId());
    }

    response.groupUserId = groupUserId;
    return response;
  }
}
