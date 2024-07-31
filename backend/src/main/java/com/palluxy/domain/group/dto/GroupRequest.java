package com.palluxy.domain.group.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
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