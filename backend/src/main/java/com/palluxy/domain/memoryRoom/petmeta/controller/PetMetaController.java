package com.palluxy.domain.memoryRoom.petmeta.controller;

import com.palluxy.domain.memoryRoom.petmeta.dto.PetMetaDto;
import com.palluxy.domain.memoryRoom.petmeta.dto.WebhookResponse; // WebhookResponse 사용
import com.palluxy.domain.memoryRoom.petmeta.service.PetMetaService;
import com.palluxy.global.common.data.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/rooms/{roomId}/petmeta")
public class PetMetaController {

    @Autowired
    private PetMetaService petMetaService;

    @Operation(summary = "새로운 PetMeta 생성")
    @ApiResponses(
        value = {
            @ApiResponse(responseCode = "201", description = "PetMeta가 성공적으로 생성되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 입력")
        }
    )
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<PetMetaDto> createPetMeta(
        @PathVariable Long roomId, @RequestBody @Valid PetMetaDto petMetaDto) {
        PetMetaDto createdPetMeta = petMetaService.createPetMeta(petMetaDto, roomId);
        return CommonResponse.created("PetMeta created successfully");
    }


    @Operation(summary = "Django로 이미지 업로드 후, 결과를 프론트로 전달")
    @ApiResponses(
        value = {
            @ApiResponse(responseCode = "201", description = "이미지가 성공적으로 업로드되고 결과가 반환되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 입력")
        }
    )
    @PostMapping(value = "/upload-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<CommonResponse<WebhookResponse.WebhookResult>> handleObjFileUpload(
        @PathVariable Long roomId, @RequestPart("file") MultipartFile file) {
        return petMetaService
            .uploadImageToDjangoAndProcess(roomId, file)
            .map(response -> CommonResponse.ok("File uploaded and processed successfully.",
                response));  // 프론트엔드로 반환
    }

    @Operation(summary = "ID로 PetMeta 조회")
    @ApiResponses(
        value = {
            @ApiResponse(responseCode = "200", description = "PetMeta가 성공적으로 조회되었습니다."),
            @ApiResponse(responseCode = "404", description = "PetMeta를 찾을 수 없습니다.")
        }
    )
    @GetMapping("/{petMetaId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<PetMetaDto> getPetMeta(
        @PathVariable Long roomId, @PathVariable Long petMetaId) {
        PetMetaDto petMeta = petMetaService.getPetMetaById(petMetaId);
        return CommonResponse.ok("PetMeta retrieved successfully", petMeta);
    }

    @Operation(summary = "Room ID로 모든 PetMeta 조회")
    @ApiResponses(
        value = {
            @ApiResponse(responseCode = "200", description = "PetMeta들이 성공적으로 조회되었습니다.")
        }
    )
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<List<PetMetaDto>> getPetMetaByRoomId(@PathVariable Long roomId) {
        List<PetMetaDto> petMetas = petMetaService.getPetMetaByRoomId(roomId);
        return CommonResponse.ok("PetMetas retrieved successfully", petMetas);
    }

    @Operation(summary = "PetMeta 업데이트")
    @ApiResponses(
        value = {
            @ApiResponse(responseCode = "200", description = "PetMeta가 성공적으로 업데이트되었습니다."),
            @ApiResponse(responseCode = "404", description = "PetMeta를 찾을 수 없습니다.")
        }
    )
    @PutMapping("/{petMetaId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<PetMetaDto> updatePetMeta(
        @PathVariable Long roomId,
        @PathVariable Long petMetaId,
        @RequestBody @Valid PetMetaDto petMetaDto) {
        PetMetaDto updatedPetMeta = petMetaService.updatePetMeta(petMetaId, petMetaDto);
        return CommonResponse.ok("PetMeta updated successfully", updatedPetMeta);
    }

    @Operation(summary = "PetMeta 위치와 회전 업데이트")
    @ApiResponses(
        value = {
            @ApiResponse(responseCode = "200", description = "PetMeta의 위치와 회전이 성공적으로 업데이트되었습니다."),
            @ApiResponse(responseCode = "404", description = "PetMeta를 찾을 수 없습니다.")
        }
    )
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
        return CommonResponse.ok("PetMeta position and rotation updated successfully",
            updatedPetMeta);
    }

    @Operation(summary = "PetMeta 위치 업데이트")
    @ApiResponses(
        value = {
            @ApiResponse(responseCode = "200", description = "PetMeta의 위치가 성공적으로 업데이트되었습니다."),
            @ApiResponse(responseCode = "404", description = "PetMeta를 찾을 수 없습니다.")
        }
    )
    @PutMapping("/{petMetaId}/position")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<PetMetaDto> updatePetMetaPosition(
        @PathVariable Long roomId,
        @PathVariable Long petMetaId,
        @RequestParam double positionX,
        @RequestParam double positionY,
        @RequestParam double positionZ) {
        PetMetaDto updatedPetMeta =
            petMetaService.updatePetMetaPosition(petMetaId, positionX, positionY, positionZ);
        return CommonResponse.ok("PetMeta position updated successfully", updatedPetMeta);
    }

    @Operation(summary = "PetMeta 회전 업데이트")
    @ApiResponses(
        value = {
            @ApiResponse(responseCode = "200", description = "PetMeta의 회전이 성공적으로 업데이트되었습니다."),
            @ApiResponse(responseCode = "404", description = "PetMeta를 찾을 수 없습니다.")
        }
    )
    @PutMapping("/{petMetaId}/rotation")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<PetMetaDto> updatePetMetaRotation(
        @PathVariable Long roomId,
        @PathVariable Long petMetaId,
        @RequestParam double rotationX,
        @RequestParam double rotationY,
        @RequestParam double rotationZ) {
        PetMetaDto updatedPetMeta =
            petMetaService.updatePetMetaRotation(petMetaId, rotationX, rotationY, rotationZ);
        return CommonResponse.ok("PetMeta rotation updated successfully", updatedPetMeta);
    }

    @Operation(summary = "ID로 PetMeta 삭제")
    @ApiResponses(
        value = {
            @ApiResponse(responseCode = "200", description = "PetMeta가 성공적으로 삭제되었습니다."),
            @ApiResponse(responseCode = "404", description = "PetMeta를 찾을 수 없습니다.")
        }
    )
    @DeleteMapping("/{petMetaId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<Void> deletePetMeta(
        @PathVariable Long roomId, @PathVariable Long petMetaId) {
        petMetaService.deletePetMeta(petMetaId);
        return CommonResponse.ok("PetMeta deleted successfully");
    }
}
