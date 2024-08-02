package com.palluxy.domain.memoryRoom.guestbook.dto;

import com.palluxy.domain.memoryRoom.guestbook.entity.Comment;
import com.palluxy.domain.user.entity.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {

  private Long commentId;
  private Long userId;
  private String nickname;  // 닉네임 필드 추가
  private String content;
  private int reportCount;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private boolean isDeleted;

  public CommentDto() {}

  public CommentDto(Comment comment, String nickname) {  // 닉네임을 생성자에 추가
    this.commentId = comment.getCommentId();
    this.userId = comment.getUser().getId();
    this.nickname = nickname;  // 닉네임 설정
    this.content = comment.getContent();
    this.reportCount = comment.getReportCount();
    this.createdAt = comment.getCreatedAt();
    this.updatedAt = comment.getUpdatedAt();
    this.isDeleted = comment.isDeleted();
  }
}
