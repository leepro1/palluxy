package com.palluxy.domain.letter.controller;

import com.palluxy.domain.letter.dto.LetterRequest;
import com.palluxy.domain.letter.entity.Letter;
import com.palluxy.domain.letter.service.LetterService;
import com.palluxy.domain.letter.util.ClaudeUtil;
import com.palluxy.global.common.CommonResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/letter")
@RequiredArgsConstructor
public class LetterController {

  private final LetterService letterService;

  @GetMapping("/{petId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getLetters(@PathVariable("petId") Long petId) {
    List<Letter> letters = letterService.findByPetIdAndOpenedAtBefore(petId);
    return CommonResponse.ok("정상적으로 편지가 조회되었음", letters);
  }

  @PostMapping("")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> writeLetter(@RequestBody LetterRequest letterRequest) {
    letterService.saveLetter(new Letter().of(letterRequest));
    letterService.sendLetters(letterRequest.getPetId());
    return CommonResponse.ok("정상적으로 편지가 저장되었음");
  }
}
