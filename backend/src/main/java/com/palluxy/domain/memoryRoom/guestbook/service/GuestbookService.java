package com.palluxy.domain.memoryRoom.guestbook.service;

import com.palluxy.domain.memoryRoom.guestbook.dto.GuestbookDto;

import java.util.List;

public interface GuestbookService {
    GuestbookDto createGuestbook(GuestbookDto guestbookDto, Long roomId, Long userId);
    GuestbookDto getGuestbookById(Long guestbookId);
    List<GuestbookDto> getAllGuestbooksByRoomId(Long roomId);
    GuestbookDto updateGuestbook(Long guestbookId, Long userId, GuestbookDto guestbookDto);
    void deleteGuestbook(Long guestbookId, Long userId);
    void reportGuestbook(Long guestbookId, Long reporterId, String reportContent);
}
