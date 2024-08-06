package com.palluxy.domain.notice.dto;

import com.palluxy.domain.notice.entity.Notice;
import lombok.Builder;

@Builder
public record NoticeDto(Long id, String title) {

    public static NoticeDto of(Notice notice) {
        return NoticeDto.builder()
            .id(notice.getId())
            .title(notice.getTitle())
            .build();
    }
}
