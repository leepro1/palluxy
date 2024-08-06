package com.palluxy.domain.notice.service;

import com.palluxy.domain.notice.dto.NoticeRequest;
import com.palluxy.domain.notice.dto.NoticeResponse;
import com.palluxy.domain.notice.entity.Notice;
import org.springframework.data.domain.Pageable;

public interface NoticeService {

    NoticeResponse getNotices(Pageable pageable);

    void createNotice(Notice notice);

    void updateNotice(Long noticeId, NoticeRequest noticeRequest);

    void deleteNotice(Long noticeId);

    Notice getNoticeById(Long noticeId);
}
