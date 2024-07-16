package com.palluxy.domain.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter @Setter
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
    private boolean isApproved;
    private String approveKey;

//    @ManyToOne
//    @JoinColumn(name = "leader_id")
//    private User leader;

//    @OneToMany(mappedBy = "group")
//    private Set<GroupUser> groupUser = new HashSet<>();
}
