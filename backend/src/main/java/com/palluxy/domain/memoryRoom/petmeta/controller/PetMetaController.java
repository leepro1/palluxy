package com.palluxy.domain.memoryRoom.petmeta.controller;

import com.palluxy.domain.memoryRoom.petmeta.dto.PetMetaDto;
import com.palluxy.domain.memoryRoom.petmeta.service.PetMetaService;
import com.palluxy.global.common.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/rooms/{roomId}/petmeta")
public class PetMetaController {

  @Autowired
  private PetMetaService petMetaService;

  @Operation(summary = "Create a new PetMeta")
  @ApiResponses(
      value = {
          @ApiResponse(
              responseCode = "201",
              description = "PetMeta created successfully"),
          @ApiResponse(responseCode = "400", description = "Invalid input")
      })
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<PetMetaDto> createPetMeta(
      @PathVariable Long roomId, @RequestBody @Valid PetMetaDto petMetaDto) {
    PetMetaDto createdPetMeta = petMetaService.createPetMeta(petMetaDto, roomId);
    return CommonResponse.created("PetMeta created successfully");
  }

  @Operation(summary = "Upload OBJ file")
  @ApiResponses(
      value = {
          @ApiResponse(
              responseCode = "201",
              description = "File uploaded successfully"),
          @ApiResponse(responseCode = "400", description = "Invalid input")
      })
  @PostMapping(value = "/upload-obj", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @ResponseStatus(HttpStatus.CREATED)
  public Mono<CommonResponse<String>> handleObjFileUpload(
      @PathVariable Long roomId, @RequestPart("file") FilePart filePart) {
    return petMetaService
        .handleObjFileUpload(roomId, filePart)
        .map(url -> CommonResponse.created("File uploaded successfully"));
  }

  @Operation(summary = "Get a PetMeta by ID")
  @ApiResponses(
      value = {
          @ApiResponse(
              responseCode = "200",
              description = "PetMeta retrieved successfully"),
          @ApiResponse(responseCode = "404", description = "PetMeta not found")
      })
  @GetMapping("/{petMetaId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<PetMetaDto> getPetMeta(
      @PathVariable Long roomId, @PathVariable Long petMetaId) {
    PetMetaDto petMeta = petMetaService.getPetMetaById(petMetaId);
    return CommonResponse.ok("PetMeta retrieved successfully", petMeta);
  }

  @Operation(summary = "Get all PetMetas by Room ID")
  @ApiResponses(
      value = {
          @ApiResponse(
              responseCode = "200",
              description = "PetMetas retrieved successfully")
      })
  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<List<PetMetaDto>> getPetMetaByRoomId(@PathVariable Long roomId) {
    List<PetMetaDto> petMetas = petMetaService.getPetMetaByRoomId(roomId);
    return CommonResponse.ok("PetMetas retrieved successfully", petMetas);
  }

  @Operation(summary = "Update a PetMeta")
  @ApiResponses(
      value = {
          @ApiResponse(
              responseCode = "200",
              description = "PetMeta updated successfully"),
          @ApiResponse(responseCode = "404", description = "PetMeta not found")
      })
  @PutMapping("/{petMetaId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<PetMetaDto> updatePetMeta(
      @PathVariable Long roomId,
      @PathVariable Long petMetaId,
      @RequestBody @Valid PetMetaDto petMetaDto) {
    PetMetaDto updatedPetMeta = petMetaService.updatePetMeta(petMetaId, petMetaDto);
    return CommonResponse.ok("PetMeta updated successfully", updatedPetMeta);
  }

  @Operation(summary = "Update PetMeta position and rotation")
  @ApiResponses(
      value = {
          @ApiResponse(
              responseCode = "200",
              description = "PetMeta position and rotation updated successfully"),
          @ApiResponse(responseCode = "404", description = "PetMeta not found")
      })
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
    PetMetaDto updatedPetMeta =
        petMetaService.updatePetMetaPositionRotation(
            petMetaId, positionX, positionY, positionZ, rotationX, rotationY, rotationZ);
    return CommonResponse.ok("PetMeta position and rotation updated successfully", updatedPetMeta);
  }

  @Operation(summary = "Delete a PetMeta by ID")
  @ApiResponses(
      value = {
          @ApiResponse(
              responseCode = "200",
              description = "PetMeta deleted successfully"),
          @ApiResponse(responseCode = "404", description = "PetMeta not found")
      })
  @DeleteMapping("/{petMetaId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<Void> deletePetMeta(
      @PathVariable Long roomId, @PathVariable Long petMetaId) {
    petMetaService.deletePetMeta(petMetaId);
    return CommonResponse.ok("PetMeta deleted successfully");
  }

  @Operation(summary = "Upload image to Django")
  @ApiResponses(
      value = {
          @ApiResponse(
              responseCode = "201",
              description = "Image uploaded successfully"),
          @ApiResponse(responseCode = "400", description = "Invalid input")
      })
  @PostMapping(value = "/upload-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @ResponseStatus(HttpStatus.CREATED)
  public Mono<CommonResponse<Void>> uploadImageToDjango(
      @PathVariable Long roomId, @RequestPart("file") MultipartFile file) {
    return petMetaService
        .uploadImageToDjango(roomId, file)
        .then(Mono.just(CommonResponse.created("Image uploaded successfully")));
  }

  @Operation(summary = "Receive Django Webhook")
  @ApiResponses(
      value = {
          @ApiResponse(responseCode = "200", description = "Webhook received successfully"),
          @ApiResponse(responseCode = "400", description = "Invalid input")
      })
  @PostMapping(value = "/webhook", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @ResponseStatus(HttpStatus.OK)
  public Mono<CommonResponse<String>> handleWebhook(
      @RequestPart("file") FilePart filePart,
      @RequestParam("roomId") Long roomId) {
    return petMetaService.processWebhook(roomId, filePart)
        .map(response -> CommonResponse.ok("Webhook received successfully"));
  }
}
