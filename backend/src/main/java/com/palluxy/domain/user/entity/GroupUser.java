package com.palluxy.domain.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class GroupUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long groupId;
    private Long userId;
    private boolean isLeader;
    private boolean isBanned;
    private LocalDateTime createdAt;

}
