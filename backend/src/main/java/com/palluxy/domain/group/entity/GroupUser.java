package com.palluxy.domain.group.entity;

import com.palluxy.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(indexes = @Index(name = "idx_group_user_group_id_and_user_id", columnList = "group_id, user_id"))
public class GroupUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private boolean isLeader = false;
  @Setter
  private boolean isBanned;
  @CreationTimestamp
  private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "group_id")
  private Group group;
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @Builder
  public GroupUser(Group group, User user) {
    this.group = group;
    this.user = user;
  }

  public void updateIsLeader(boolean isLeader) {
    this.isLeader = isLeader;
  }
}
