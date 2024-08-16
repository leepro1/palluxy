package com.palluxy.domain.notice.dto;

import java.time.LocalDate;
import java.util.List;

public record NoticeResponse(List<NoticeDto> notices, Long totalNoticeCount) {

}
