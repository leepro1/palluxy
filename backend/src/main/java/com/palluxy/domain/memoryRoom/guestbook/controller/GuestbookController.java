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

    @GetMapping("/{id}")
    public GuestbookDto getGuestbookEntry(@PathVariable Long id) {
        return guestbookService.getGuestbookEntryById(id);
    }

    @GetMapping("/room/{roomId}")
    public List<GuestbookDto> getAllGuestbookEntriesByRoomId(@PathVariable Long roomId) {
        return guestbookService.getAllGuestbookEntriesByRoomId(roomId);
    }

    @PutMapping("/{id}/user/{userId}")
    public GuestbookDto updateGuestbookEntry(@PathVariable Long id, @PathVariable Long userId, @RequestBody GuestbookDto guestbookDto) {
        return guestbookService.updateGuestbookEntry(id, userId, guestbookDto);
    }

    @DeleteMapping("/{id}/user/{userId}")
    public void deleteGuestbookEntry(@PathVariable Long id, @PathVariable Long userId) {
        guestbookService.deleteGuestbookEntry(id, userId);
    }
}
