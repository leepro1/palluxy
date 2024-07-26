package com.palluxy.domain.group.entity;

import com.palluxy.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Builder;
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

  @CreationTimestamp private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "group_id")
  private Group group;

  @Builder
  public GroupHistory(Long userId, Long groupId, Action action) {}
}
