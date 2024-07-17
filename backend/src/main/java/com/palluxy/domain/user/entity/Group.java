package com.palluxy.domain.user.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
    private LocalDateTime createdAt;
    @UpdateTimestamp
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
}
