package com.palluxy.domain.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Group {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long leaderId;
    private String title;
    private String description;
    private String filePath;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isApproved;
    private String approveKey;
}
