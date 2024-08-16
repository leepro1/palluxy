package com.palluxy.domain.group.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import org.springframework.web.multipart.MultipartFile;

public record GroupRequest(
    String title,
    String description,
    MultipartFile file,
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    LocalDateTime startTime,
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    LocalDateTime endTime,
    int maxCapacity,

    Long leaderId,
    Long userId
) {

}