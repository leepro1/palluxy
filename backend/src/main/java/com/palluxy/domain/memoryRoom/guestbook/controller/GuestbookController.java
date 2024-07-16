package com.palluxy.domain.memoryRoom.guestbook.controller;

import com.palluxy.domain.memoryRoom.guestbook.dto.GuestbookDto;
import com.palluxy.domain.memoryRoom.guestbook.service.GuestbookService;
import com.palluxy.global.common.CommonResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guestbook")
public class GuestbookController {

    @Autowired
    private GuestbookService guestbookService;

    @PostMapping("/room/{roomId}/user/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<GuestbookDto> createGuestbook(@Valid @RequestBody GuestbookDto guestbookDto, @PathVariable Long roomId, @PathVariable Long userId) {
        GuestbookDto createdGuestbook = guestbookService.createGuestbook(guestbookDto, roomId, userId);
        return CommonResponse.created("Guestbook entry created successfully");
    }

    @GetMapping("/{guestbookId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<GuestbookDto> getGuestbook(@PathVariable Long guestbookId) {
        GuestbookDto guestbook = guestbookService.getGuestbookById(guestbookId);
        return CommonResponse.ok("Guestbook entry retrieved successfully", guestbook);
    }

    @GetMapping("/room/{roomId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<List<GuestbookDto>> getAllGuestbooksByRoom(@PathVariable Long roomId) {
        List<GuestbookDto> guestbooks = guestbookService.getAllGuestbooksByRoomId(roomId);
        return CommonResponse.ok("Guestbook entries retrieved successfully", guestbooks);
    }

    @PutMapping("/{guestbookId}/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<GuestbookDto> updateGuestbook(@PathVariable Long guestbookId, @PathVariable Long userId, @Valid @RequestBody GuestbookDto guestbookDto) {
        GuestbookDto updatedGuestbook = guestbookService.updateGuestbook(guestbookId, userId, guestbookDto);
        return CommonResponse.ok("Guestbook entry updated successfully", updatedGuestbook);
    }

    @DeleteMapping("/{guestbookId}/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<Void> deleteGuestbook(@PathVariable Long guestbookId, @PathVariable Long userId) {
        guestbookService.deleteGuestbook(guestbookId, userId);
        return CommonResponse.ok("Guestbook entry deleted successfully");
    }
}
