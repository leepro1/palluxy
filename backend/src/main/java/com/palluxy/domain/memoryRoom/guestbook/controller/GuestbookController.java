package com.palluxy.domain.memoryRoom.guestbook.controller;

import com.palluxy.domain.memoryRoom.guestbook.dto.CommentDto;
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

  @Autowired private GuestbookService guestbookService;

  @PostMapping("/room/{roomId}/user/{userId}")
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<GuestbookDto> createGuestbook(
      @Valid @RequestBody GuestbookDto guestbookDto,
      @PathVariable Long roomId,
      @PathVariable Long userId) {
    GuestbookDto createdGuestbook = guestbookService.createGuestbook(guestbookDto, roomId, userId);
    return CommonResponse.created("Guestbook entry created successfully");
  }

  @GetMapping("/{guestbookId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<GuestbookDto> getGuestbook(@PathVariable Long guestbookId) {
    GuestbookDto guestbook = guestbookService.getGuestbookById(guestbookId);
    return CommonResponse.ok("Guestbook entry retrieved successfully", guestbook);
  }

  @PutMapping("/{guestbookId}/user/{userId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<GuestbookDto> updateGuestbook(
      @PathVariable Long guestbookId,
      @PathVariable Long userId,
      @Valid @RequestBody GuestbookDto guestbookDto) {
    GuestbookDto updatedGuestbook =
        guestbookService.updateGuestbook(guestbookId, userId, guestbookDto);
    return CommonResponse.ok("Guestbook entry updated successfully", updatedGuestbook);
  }

  @PostMapping("/{guestbookId}/comment/user/{userId}")
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<Void> addComment(
      @PathVariable Long guestbookId,
      @PathVariable Long userId,
      @Valid @RequestBody CommentDto commentDto) {
    guestbookService.addComment(guestbookId, userId, commentDto.getContent());
    return CommonResponse.created("Comment added successfully");
  }

  @PutMapping("/comment/{commentId}/user/{userId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<Void> updateComment(
      @PathVariable Long commentId,
      @PathVariable Long userId,
      @Valid @RequestBody CommentDto commentDto) {
    guestbookService.updateComment(commentId, userId, commentDto.getContent());
    return CommonResponse.ok("Comment updated successfully");
  }

  @DeleteMapping("/comment/{commentId}/user/{userId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<Void> deleteComment(
      @PathVariable Long commentId, @PathVariable Long userId) {
    guestbookService.deleteComment(commentId, userId);
    return CommonResponse.ok("Comment deleted successfully");
  }

  @PostMapping("/comment/{commentId}/report/user/{reporterId}")
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<Void> reportComment(
      @PathVariable Long commentId, @PathVariable Long reporterId) {
    guestbookService.reportComment(commentId, reporterId);
    return CommonResponse.created("Comment reported successfully");
  }

  @GetMapping("/{guestbookId}/comments")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<List<CommentDto>> getAllComments(@PathVariable Long guestbookId) {
    List<CommentDto> comments = guestbookService.getAllCommentsByGuestbookId(guestbookId);
    return CommonResponse.ok("Comments retrieved successfully", comments);
  }
}
