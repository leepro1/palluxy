package com.palluxy.domain.group.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.palluxy.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
@Table(name="`group`")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String filePath;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime updatedAt;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String approveKey;
    private int maxCapacity;
    private int remainingCapacity;

    @ManyToOne
    @JoinColumn(name = "leader_id")
    private User leader;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private Set<GroupUser> groupUser;

    public Group() {}

    public Group(Long id, String title, String description, String filePath, LocalDateTime startTime, LocalDateTime endTime, int maxCapacity, int remainingCapacity) {
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
