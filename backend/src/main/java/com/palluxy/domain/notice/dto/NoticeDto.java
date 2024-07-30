package com.palluxy.domain.notice.dto;

import com.palluxy.domain.notice.entity.Notice;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeDto {
  private Long id;
  private String title;

  @Builder
  public NoticeDto(Long id, String title) {
    this.id = id;
    this.title = title;
  }

  public static NoticeDto of(Notice notice) {
    return NoticeDto.builder()
        .id(notice.getId())
        .title(notice.getTitle())
        .build();
  }
}
