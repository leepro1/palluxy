package com.palluxy.domain.notice.dto;

import com.palluxy.domain.notice.entity.Notice;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeTitleResponse {
  private Long id;
  private String title;

  @Builder
  public NoticeTitleResponse(Long id, String title) {
    this.id = id;
    this.title = title;
  }

  public static NoticeTitleResponse of(Notice notice) {
    return NoticeTitleResponse.builder()
        .id(notice.getId())
        .title(notice.getTitle())
        .build();
  }
}
