package com.palluxy.domain.group.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.palluxy.domain.user.entity.User;
import com.palluxy.domain.group.dto.Status;
import com.palluxy.global.common.data.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Table(name = "`group`", indexes = {
    @Index(name = "idx_group_status", columnList = "status"),
    @Index(name = "idx_group_status_capacity_starttime", columnList = "status, remaining_capacity, start_time")
})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Group extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String filePath;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String approveKey;
    private int maxCapacity;
    private int remainingCapacity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leader_id")
    private User leader;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<GroupUser> groupUser;

    @Builder
    public Group(Long id, String title, String description, String filePath,
        LocalDateTime startTime,
        LocalDateTime endTime, LocalDateTime updatedAt,
        String approveKey, int maxCapacity, int remainingCapacity, User leader
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.filePath = filePath;
        this.startTime = startTime;
        this.endTime = endTime;
        this.updatedAt = updatedAt;
        this.approveKey = approveKey;
        this.maxCapacity = maxCapacity;
        this.remainingCapacity = remainingCapacity;
        this.leader = leader;
    }

    public void updateCapacity(int newCapacity) {
        this.remainingCapacity = newCapacity;
    }

    public void updateApproveKey(String key) {
        this.approveKey = key;
    }

    public void updateInfo(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public void updateStatus(Status status, String key) {
        this.status = status;
    }
}
