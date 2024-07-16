package com.palluxy.domain.memoryRoom.guestbook.service;

import com.palluxy.domain.memoryRoom.guestbook.dto.GuestbookDto;
import java.util.List;

public interface GuestbookService {
    GuestbookDto createGuestbookEntry(Long roomId, Long userId, GuestbookDto guestbookDto);
    GuestbookDto getGuestbookEntryById(Long id);
    List<GuestbookDto> getAllGuestbookEntriesByRoomId(Long roomId);
    GuestbookDto updateGuestbookEntry(Long id, Long userId, GuestbookDto guestbookDto);
    void deleteGuestbookEntry(Long id, Long userId);
}
