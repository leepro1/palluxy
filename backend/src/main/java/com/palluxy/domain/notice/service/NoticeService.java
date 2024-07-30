package com.palluxy.domain.notice.service;

import com.palluxy.domain.notice.dto.NoticeRequest;
import com.palluxy.domain.notice.dto.NoticeTitleResponse;
import com.palluxy.domain.notice.entity.Notice;
import com.palluxy.domain.group.exception.NotFoundException;
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
public class NoticeService {

  private final NoticeRepository noticeRepository;

  public List<NoticeTitleResponse> getNotices(Pageable pageable) {
    Page<Notice> notices = noticeRepository.findAll(pageable);
    List<NoticeTitleResponse> noticeTitles = new ArrayList<>();
    for (Notice notice : notices.getContent()) {
      noticeTitles.add(NoticeTitleResponse.of(notice));
    }

    return noticeTitles;
  }

  public void createNotice(Notice notice) {
    noticeRepository.saveAndFlush(notice);
  }

  public void updateNotice(Long noticeId, NoticeRequest noticeRequest) {
    Notice notice = getNoticeById(noticeId);
    notice.updateInfo(noticeRequest);
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
