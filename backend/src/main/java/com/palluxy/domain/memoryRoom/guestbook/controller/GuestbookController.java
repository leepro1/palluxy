package com.palluxy.domain.memoryRoom.guestbook.controller;

import com.palluxy.domain.memoryRoom.guestbook.dto.GuestbookDto;
import com.palluxy.domain.memoryRoom.guestbook.service.GuestbookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guestbook")
public class GuestbookController {

    @Autowired
    private GuestbookService guestbookService;

    @PostMapping("/room/{roomId}/user/{userId}")
    public GuestbookDto createGuestbookEntry(@PathVariable Long roomId, @PathVariable Long userId, @RequestBody GuestbookDto guestbookDto) {
        return guestbookService.createGuestbookEntry(roomId, userId, guestbookDto);
    }

    @GetMapping("/{guestbookId}")
    public GuestbookDto getGuestbookEntry(@PathVariable Long guestbookId) {
        return guestbookService.getGuestbookEntryById(guestbookId);
    }

    @GetMapping("/room/{roomId}")
    public List<GuestbookDto> getAllGuestbookEntriesByRoomId(@PathVariable Long roomId) {
        return guestbookService.getAllGuestbookEntriesByRoomId(roomId);
    }

    @PutMapping("/{guestbookId}/user/{userId}")
    public GuestbookDto updateGuestbookEntry(@PathVariable Long guestbookId, @PathVariable Long userId, @RequestBody GuestbookDto guestbookDto) {
        return guestbookService.updateGuestbookEntry(guestbookId, userId, guestbookDto);
    }

    @DeleteMapping("/{guestbookId}/user/{userId}")
    public void deleteGuestbookEntry(@PathVariable Long guestbookId, @PathVariable Long userId) {
        guestbookService.deleteGuestbookEntry(guestbookId, userId);
    }
}
