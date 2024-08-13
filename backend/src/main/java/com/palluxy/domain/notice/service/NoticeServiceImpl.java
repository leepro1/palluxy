package com.palluxy.domain.notice.service;

import com.palluxy.domain.notice.dto.NoticeRequest;
import com.palluxy.domain.notice.dto.NoticeDto;
import com.palluxy.domain.notice.dto.NoticeResponse;
import com.palluxy.domain.notice.entity.Notice;
import com.palluxy.global.common.error.NotFoundException;
import com.palluxy.domain.notice.repository.NoticeRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;

    public NoticeResponse getNotices(Pageable pageable) {
        Page<Notice> noticePage = noticeRepository.findAllByOrderByCreatedAtDesc(pageable);
        List<NoticeDto> notices = new ArrayList<>();
        for (Notice notice : noticePage.getContent()) {
            notices.add(NoticeDto.of(notice));
        }

        return new NoticeResponse(notices, noticePage.getTotalElements());
    }

    public Notice createNotice(Notice notice) {
        Long noticeId = noticeRepository.save(notice).getId();
        return getNoticeById(noticeId);
    }

    public Notice updateNotice(Long noticeId, NoticeRequest noticeRequest) {
        Notice notice = getNoticeById(noticeId);
        notice.updateInfo(noticeRequest);
        noticeRepository.saveAndFlush(notice);
        return getNoticeById(noticeId);
    }

    public void deleteNotice(Long noticeId) {
        noticeRepository.deleteById(noticeId);
    }

    public Notice getNoticeById(Long noticeId) {
        Optional<Notice> notice = noticeRepository.findById(noticeId);
        if (!notice.isPresent()) {
            throw new NotFoundException("공지사항");
        }

        return notice.get();
    }
}
