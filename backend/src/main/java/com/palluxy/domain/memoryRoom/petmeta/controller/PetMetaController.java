package com.palluxy.domain.memoryRoom.petmeta.controller;

import com.palluxy.domain.memoryRoom.petmeta.dto.PetMetaDto;
import com.palluxy.domain.memoryRoom.petmeta.service.PetMetaService;
import com.palluxy.global.common.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/rooms/{roomId}/petmeta")
public class PetMetaController {

  @Autowired
  private PetMetaService petMetaService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<PetMetaDto> createPetMeta(@PathVariable Long roomId, @Valid @RequestBody PetMetaDto petMetaDto) {
    PetMetaDto createdPetMeta = petMetaService.createPetMeta(petMetaDto, roomId);
    return CommonResponse.created("PetMeta created successfully");
  }

  @GetMapping("/{petMetaId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<PetMetaDto> getPetMeta(@PathVariable Long roomId, @PathVariable Long petMetaId) {
    PetMetaDto petMeta = petMetaService.getPetMetaById(petMetaId);
    return CommonResponse.ok("PetMeta retrieved successfully", petMeta);
  }

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<List<PetMetaDto>> getPetMetaByRoomId(@PathVariable Long roomId) {
    List<PetMetaDto> petMetas = petMetaService.getPetMetaByRoomId(roomId);
    return CommonResponse.ok("PetMetas retrieved successfully", petMetas);
  }

  @PutMapping("/{petMetaId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<PetMetaDto> updatePetMeta(@PathVariable Long roomId, @PathVariable Long petMetaId, @Valid @RequestBody PetMetaDto petMetaDto) {
    PetMetaDto updatedPetMeta = petMetaService.updatePetMeta(petMetaId, petMetaDto);
    return CommonResponse.ok("PetMeta updated successfully", updatedPetMeta);
  }

  @PutMapping("/{petMetaId}/position-rotation")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<PetMetaDto> updatePetMetaPositionRotation(
      @PathVariable Long roomId,
      @PathVariable Long petMetaId,
      @RequestParam double positionX,
      @RequestParam double positionY,
      @RequestParam double positionZ,
      @RequestParam double rotationX,
      @RequestParam double rotationY,
      @RequestParam double rotationZ) {
    PetMetaDto updatedPetMeta = petMetaService.updatePetMetaPositionRotation(petMetaId, positionX, positionY, positionZ, rotationX, rotationY, rotationZ);
    return CommonResponse.ok("PetMeta position and rotation updated successfully", updatedPetMeta);
  }

  @DeleteMapping("/{petMetaId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<Void> deletePetMeta(@PathVariable Long roomId, @PathVariable Long petMetaId) {
    petMetaService.deletePetMeta(petMetaId);
    return CommonResponse.ok("PetMeta deleted successfully");
  }
}
