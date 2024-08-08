package com.palluxy.domain.letter.controller;

import com.palluxy.domain.letter.dto.LetterRequest;
import com.palluxy.domain.letter.entity.Letter;
import com.palluxy.domain.letter.service.LetterService;
import com.palluxy.domain.pet.dto.response.PetResponse;
import com.palluxy.domain.pet.service.PetService;
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
    private final PetService petService;

    @GetMapping("/{petId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> getLetters(@PathVariable("petId") Long petId) {
        List<Letter> letters = letterService.findByPetIdAndOpenedAtBefore(petId);
        return CommonResponse.ok("정상적으로 편지가 조회되었습니다.", letters);
    }

    @GetMapping("/room/{roomId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> getLettersByRoomId(@PathVariable("roomId") Long roomId) {
        List<Letter> letters = letterService.findLettersByRoomIdAndOpenedAtBefore(roomId);
        return CommonResponse.ok("정상적으로 편지가 조회되었습니다.", letters);
    }

    @PostMapping("/first")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> writeFirstLetter(
        @RequestParam("petId") Long petId,
        @RequestParam("roomId") Long roomId) {
        PetResponse pet = petService.findById(petId);
        letterService.saveFirstLetter(pet.relation(), pet.name(), petId, roomId);
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
