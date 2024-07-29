package com.palluxy.domain.group.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.palluxy.domain.group.dto.GroupRequest;
import com.palluxy.domain.group.dto.GroupResponse;
import com.palluxy.domain.user.entity.User;
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
@Setter
@Table(name = "`group`")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

  @Builder
  public Group(
      Long id,
      String title,
      String description,
      String filePath,
      LocalDateTime startTime,
      LocalDateTime endTime,
      int maxCapacity,
      int remainingCapacity) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.filePath = filePath;
    this.startTime = startTime;
    this.endTime = endTime;
    this.maxCapacity = maxCapacity;
    this.remainingCapacity = remainingCapacity;
  }

  public Group of(GroupResponse groupResponse) {
    return Group.builder()
        .id(groupResponse.getId())
        .title(groupResponse.getTitle())
        .description(groupResponse.getDescription())
        .filePath(groupResponse.getFilePath())
        .startTime(groupResponse.getStartTime())
        .endTime(groupResponse.getEndTime())
        .maxCapacity(groupResponse.getMaxCapacity())
        .remainingCapacity(groupResponse.getRemainingCapacity())
        .build();
  }

  public void updateInfo(Group request) {
    this.title = request.getTitle();
    this.description = request.getDescription();
    this.filePath = request.getFilePath();
  }
}
