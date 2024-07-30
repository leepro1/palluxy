package com.palluxy.domain.notice.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class NoticeResponse {
  private List<NoticeDto> notices;
  private Long totalNoticeCount;

  public NoticeResponse(List<NoticeDto> notices, Long totalNoticeCount) {
    this.notices = notices;
    this.totalNoticeCount = totalNoticeCount;
  }
}
