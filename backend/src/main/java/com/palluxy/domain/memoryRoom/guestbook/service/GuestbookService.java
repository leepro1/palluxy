package com.palluxy.domain.memoryRoom.guestbook.service;

import com.palluxy.domain.memoryRoom.guestbook.dto.GuestbookDto;
import java.util.List;

public interface GuestbookService {
    GuestbookDto createGuestbookEntry(Long roomId, Long userId, GuestbookDto guestbookDto);
    GuestbookDto getGuestbookEntryById(Long guestbookId);
    List<GuestbookDto> getAllGuestbookEntriesByRoomId(Long roomId);
    GuestbookDto updateGuestbookEntry(Long guestbookId, Long userId, GuestbookDto guestbookDto);
    void deleteGuestbookEntry(Long guestbookId, Long userId);
}
