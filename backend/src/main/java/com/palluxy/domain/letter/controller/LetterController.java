package com.palluxy.domain.letter.controller;

import com.palluxy.domain.letter.dto.LetterRequest;
import com.palluxy.domain.letter.entity.Letter;
import com.palluxy.domain.letter.service.LetterService;
import com.palluxy.domain.letter.service.LetterServiceImpl;
import com.palluxy.global.common.data.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/letter")
@RequiredArgsConstructor
public class LetterController {

  private final LetterService letterService;

  @GetMapping("/{petId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getLetters(@PathVariable("petId") Long petId) {
    List<Letter> letters = letterService.findByPetIdAndOpenedAtBefore(petId);
    return CommonResponse.ok("정상적으로 편지가 조회되었습니다.", letters);
  }

  @GetMapping("/room/{roomId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getLettersByRoomId(@PathVariable("roomId") Long roomId) {
    List<Letter> letters = letterService.findLettersByRoomId(roomId);
    return CommonResponse.ok("정상적으로 편지가 조회되었습니다.", letters);
  }

  @PostMapping("/first")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> writeFirstLetter(
      @RequestParam("relation") String relation,
      @RequestParam("petName") String petName,
      @RequestParam("petId") Long petId,
      @RequestParam("roomId") Long roomId) {
    letterService.saveFirstLetter(relation, petName, petId, roomId);
    return CommonResponse.ok("정상적으로 첫 번째 편지가 저장되었습니다.");
  }

  @PostMapping("/{petId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> writeLetter(
      @PathVariable("petId") Long petId,
      @RequestBody LetterRequest letterRequest,
      @RequestParam("roomId") Long roomId) {
    Letter letter = Letter.of(letterRequest, petId, letterService.getRoom(roomId));
    letterService.saveLetter(letter);
    letterService.sendLetters(petId, roomId);
    return CommonResponse.ok("정상적으로 편지가 저장되었습니다.");
  }
}
