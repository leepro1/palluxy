package com.palluxy.domain.pet.controller;

import com.palluxy.domain.pet.dto.request.PetRegisterRequest;
import com.palluxy.domain.pet.dto.response.PersonalityResponse;
import com.palluxy.domain.pet.dto.response.PetIdResponse;
import com.palluxy.domain.pet.dto.response.PetResponse;
import com.palluxy.domain.pet.service.PetService;
import com.palluxy.global.common.data.CommonResponse;
import com.palluxy.global.common.util.AuthUtil;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets")
public class PetController {

  private final PetService petService;

  @GetMapping("/personalities")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getAllPersonalities() {

    List<PersonalityResponse> response = petService.getAllPersonalities();

    return CommonResponse.ok("기본 성격 리스트 조회 성공", response);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<?> createPet(@Valid @RequestBody PetRegisterRequest request) {
    petService.registerPet(request);
    return CommonResponse.created("반려동물 정보 저장 성공");
  }

  @GetMapping("/{petId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getPetById(@PathVariable Long petId) {
    PetResponse response = petService.findById(petId);
    return CommonResponse.ok("반려동물 정보 조회 성공", response);
  }

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getPetIdByUserId() {
    Long userId = AuthUtil.checkAuthorityByUserId();
    PetIdResponse response = petService.findByUserId(userId);
    return CommonResponse.ok("token으로 반려동물 정보 조회 성공", response);
  }

  @PutMapping("/{petId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> updatePet(@PathVariable Long petId,
      @Valid @RequestBody PetRegisterRequest request) {
    petService.updatePet(petId, request);
    return CommonResponse.ok("반려동물 정보 수정 성공");
  }

  @DeleteMapping("/{petId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> deletePet(@PathVariable Long petId) {
    petService.deletePet(petId);
    return CommonResponse.ok("반려동물 삭제 성공");
  }

}
