package com.palluxy.domain.memoryRoom.guestbook.controller;

import com.palluxy.domain.memoryRoom.guestbook.dto.CommentDto;
import com.palluxy.domain.memoryRoom.guestbook.dto.GuestbookDto;
import com.palluxy.domain.memoryRoom.guestbook.service.GuestbookService;
import com.palluxy.global.common.data.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guestbook")
@Tag(name = "Guestbook API", description = "게스트북 관련 API")
public class GuestbookController {

  @Autowired private GuestbookService guestbookService;

  @PostMapping("/room/{roomId}/user/{userId}")
  @ResponseStatus(HttpStatus.CREATED)
  @Operation(summary = "Create Guestbook Entry", description = "특정 방과 사용자에 대한 새로운 게스트북 항목을 생성합니다.")
  public CommonResponse<GuestbookDto> createGuestbook(
      @Valid @RequestBody GuestbookDto guestbookDto,
      @Parameter(description = "방 ID", required = true) @PathVariable Long roomId,
      @Parameter(description = "사용자 ID", required = true) @PathVariable Long userId) {
    GuestbookDto createdGuestbook = guestbookService.createGuestbook(guestbookDto, roomId, userId);
    return CommonResponse.created("Guestbook entry created successfully");
  }

  @GetMapping("/room/{roomId}")
  @ResponseStatus(HttpStatus.OK)
  @Operation(summary = "Get Guestbook by Room ID", description = "Room ID로 게스트북 항목을 검색합니다.")
  public CommonResponse<GuestbookDto> getGuestbookByRoomId(
      @Parameter(description = "Room ID", required = true) @PathVariable Long roomId) {
    GuestbookDto guestbook = guestbookService.getGuestbookByRoomId(roomId);
    return CommonResponse.ok("Guestbook retrieved successfully", guestbook);
  }

  @GetMapping("/{guestbookId}")
  @ResponseStatus(HttpStatus.OK)
  @Operation(summary = "Get Guestbook Entry", description = "ID로 게스트북 항목을 검색합니다.")
  public CommonResponse<GuestbookDto> getGuestbook(
      @Parameter(description = "게스트북 항목 ID", required = true) @PathVariable Long guestbookId) {
    GuestbookDto guestbook = guestbookService.getGuestbookById(guestbookId);
    return CommonResponse.ok("Guestbook entry retrieved successfully", guestbook);
  }

  @PutMapping("/{guestbookId}/user/{userId}")
  @ResponseStatus(HttpStatus.OK)
  @Operation(summary = "Update Guestbook Entry", description = "기존 게스트북 항목을 업데이트합니다.")
  public CommonResponse<GuestbookDto> updateGuestbook(
      @Parameter(description = "게스트북 항목 ID", required = true) @PathVariable Long guestbookId,
      @Parameter(description = "사용자 ID", required = true) @PathVariable Long userId,
      @Valid @RequestBody GuestbookDto guestbookDto) {
    GuestbookDto updatedGuestbook =
        guestbookService.updateGuestbook(guestbookId, userId, guestbookDto);
    return CommonResponse.ok("Guestbook entry updated successfully", updatedGuestbook);
  }

  @PostMapping("/{guestbookId}/comment/user/{userId}")
  @ResponseStatus(HttpStatus.CREATED)
  @Operation(summary = "Add Comment", description = "게스트북 항목에 댓글을 추가합니다.")
  public CommonResponse<Void> addComment(
      @Parameter(description = "게스트북 항목 ID", required = true) @PathVariable Long guestbookId,
      @Parameter(description = "사용자 ID", required = true) @PathVariable Long userId,
      @Valid @RequestBody CommentDto commentDto) {
    guestbookService.addComment(guestbookId, userId, commentDto.getContent());
    return CommonResponse.created("Comment added successfully");
  }

  @PutMapping("/comment/{commentId}/user/{userId}")
  @ResponseStatus(HttpStatus.OK)
  @Operation(summary = "Update Comment", description = "기존 댓글을 업데이트합니다.")
  public CommonResponse<Void> updateComment(
      @Parameter(description = "댓글 ID", required = true) @PathVariable Long commentId,
      @Parameter(description = "사용자 ID", required = true) @PathVariable Long userId,
      @Valid @RequestBody CommentDto commentDto) {
    guestbookService.updateComment(commentId, userId, commentDto.getContent());
    return CommonResponse.ok("Comment updated successfully");
  }

  @DeleteMapping("/comment/{commentId}/user/{userId}")
  @ResponseStatus(HttpStatus.OK)
  @Operation(summary = "Delete Comment", description = "게스트북 항목에서 댓글을 삭제합니다.")
  public CommonResponse<Void> deleteComment(
      @Parameter(description = "댓글 ID", required = true) @PathVariable Long commentId,
      @Parameter(description = "사용자 ID", required = true) @PathVariable Long userId) {
    guestbookService.deleteComment(commentId, userId);
    return CommonResponse.ok("Comment deleted successfully");
  }

  @PostMapping("/comment/{commentId}/report/user/{reporterId}")
  @ResponseStatus(HttpStatus.CREATED)
  @Operation(summary = "Report Comment", description = "댓글을 신고합니다.")
  public CommonResponse<Void> reportComment(
      @Parameter(description = "댓글 ID", required = true) @PathVariable Long commentId,
      @Parameter(description = "신고자 ID", required = true) @PathVariable Long reporterId) {
    guestbookService.reportComment(commentId, reporterId);
    return CommonResponse.created("Comment reported successfully");
  }

  @GetMapping("/{guestbookId}/comments")
  @ResponseStatus(HttpStatus.OK)
  @Operation(summary = "Get All Comments", description = "특정 게스트북 항목의 모든 댓글을 검색합니다.")
  public CommonResponse<List<CommentDto>> getAllComments(
      @Parameter(description = "게스트북 항목 ID", required = true) @PathVariable Long guestbookId) {
    List<CommentDto> comments = guestbookService.getAllCommentsByGuestbookId(guestbookId);
    return CommonResponse.ok("Comments retrieved successfully", comments);
  }
}
