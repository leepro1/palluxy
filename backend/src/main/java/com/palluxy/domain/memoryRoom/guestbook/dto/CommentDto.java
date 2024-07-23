package com.palluxy.domain.memoryRoom.guestbook.dto;

import com.palluxy.domain.memoryRoom.guestbook.entity.Comment;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {

  private Long commentId;
  private Long userId;
  private String content;
  private int reportCount;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private boolean isDeleted;

  public CommentDto() {}

  public CommentDto(Comment comment) {
    this.commentId = comment.getCommentId();
    this.userId = comment.getUser().getId();
    this.content = comment.getContent();
    this.reportCount = comment.getReportCount();
    this.createdAt = comment.getCreatedAt();
    this.updatedAt = comment.getUpdatedAt();
    this.isDeleted = comment.isDeleted();
  }
}
