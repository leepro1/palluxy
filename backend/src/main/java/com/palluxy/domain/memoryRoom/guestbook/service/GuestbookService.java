package com.palluxy.domain.memoryRoom.guestbook.service;

import com.palluxy.domain.memoryRoom.guestbook.dto.CommentDto;
import com.palluxy.domain.memoryRoom.guestbook.dto.GuestbookDto;

import java.util.List;

public interface GuestbookService {

    GuestbookDto createGuestbook(GuestbookDto guestbookDto, Long roomId, Long userId);

    GuestbookDto getGuestbookById(Long guestbookId);

    GuestbookDto getGuestbookByRoomId(Long roomId);  // Room ID로 Guestbook 찾기 추가

    GuestbookDto updateGuestbook(Long guestbookId, Long userId, GuestbookDto guestbookDto);

    void addComment(Long guestbookId, Long userId, String content);

    void updateComment(Long commentId, Long userId, String content);

    void deleteComment(Long commentId, Long userId);

    void reportComment(Long commentId, Long reporterId);

    List<CommentDto> getAllCommentsByGuestbookId(Long guestbookId);
}
