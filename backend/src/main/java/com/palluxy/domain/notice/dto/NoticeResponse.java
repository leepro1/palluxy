package com.palluxy.domain.notice.dto;

import java.util.List;

public record NoticeResponse(List<NoticeDto> notices, Long totalNoticeCount) {

}
