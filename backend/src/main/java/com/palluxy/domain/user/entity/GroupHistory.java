package com.palluxy.domain.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class GroupHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private Action action;
    @CreationTimestamp
    private LocalDateTime createdAt;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//    @ManyToOne
//    @JoinColumn(name = "group_id")
//    private Group group;
}
