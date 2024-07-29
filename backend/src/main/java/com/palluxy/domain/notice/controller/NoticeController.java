package com.palluxy.domain.notice.controller;

import com.palluxy.domain.notice.dto.NoticeRequest;
import com.palluxy.domain.notice.dto.NoticeTitleResponse;
import com.palluxy.domain.notice.entity.Notice;
import com.palluxy.domain.notice.service.NoticeService;
import com.palluxy.global.common.CommonResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/notice")
@RequiredArgsConstructor
public class NoticeController {

  private final NoticeService noticeService;

  @GetMapping("/{pageNumber}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getNotices(@PathVariable("pageId") int pageNumber) {
    Pageable pageable = PageRequest.of(pageNumber, 10);
    List<NoticeTitleResponse> notices = noticeService.getNotices(pageable);
    return CommonResponse.ok("공지사항이 정상적으로 조회되었음", notices);
  }

  @GetMapping("/detail/{noticeId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getNoticeDetail(@PathVariable("noticeId") Long noticeId) {
    Notice notice = noticeService.getNoticeById(noticeId);
    return CommonResponse.ok("공지사항이 정상적으로 조회되었음", notice);
  }

  @PatchMapping("/detail/{noticeId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> updateNotice(@PathVariable("noticeId") Long noticeId, @RequestBody NoticeRequest noticeRequest) {
    noticeService.updateNotice(noticeId, noticeRequest);
    return CommonResponse.ok("공지사항이 정상적으로 수정되었음");
  }

  @DeleteMapping("/detail/{noticeId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> deleteNotice(@PathVariable("noticeId") Long noticeId) {
    noticeService.deleteNotice(noticeId);
    return CommonResponse.ok("공지사항이 정상적으로 삭제되었음");
  }

  @PostMapping("")
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<?> createNotice(@RequestBody NoticeRequest noticeRequest) {
    noticeService.createNotice(Notice.of(noticeRequest));
    return CommonResponse.created("공지사항이 정상적으로 등록되었음");
  }

}
