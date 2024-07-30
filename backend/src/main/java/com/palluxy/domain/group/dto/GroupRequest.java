package com.palluxy.domain.group.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.palluxy.domain.group.entity.Group;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class GroupRequest {
  private String title;
  private String description;
  private MultipartFile file;
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime startTime;
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime endTime;
  private int maxCapacity;

  private Long leaderId;
  private Long userId;
}
