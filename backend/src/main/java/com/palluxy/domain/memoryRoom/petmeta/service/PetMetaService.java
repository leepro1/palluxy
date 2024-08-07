package com.palluxy.domain.memoryRoom.petmeta.service;

import com.palluxy.domain.memoryRoom.petmeta.dto.PetMetaDto;
import com.palluxy.domain.memoryRoom.petmeta.dto.WebhookRequest;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.util.List;

public interface PetMetaService {

    PetMetaDto createPetMeta(PetMetaDto petMetaDto, Long roomId);

    PetMetaDto getPetMetaById(Long petMetaId);

    List<PetMetaDto> getPetMetaByRoomId(Long roomId);

    PetMetaDto updatePetMeta(Long petMetaId, PetMetaDto petMetaDto);

    PetMetaDto updatePetMetaPositionRotation(Long petMetaId, double positionX, double positionY,
        double positionZ, double rotationX, double rotationY, double rotationZ);

    PetMetaDto updatePetMetaPosition(Long petMetaId, double positionX, double positionY,
        double positionZ);

    PetMetaDto updatePetMetaRotation(Long petMetaId, double rotationX, double rotationY,
        double rotationZ);

    void deletePetMeta(Long petMetaId);

    Mono<String> uploadImageToDjangoAndProcess(Long roomId, MultipartFile file);

    Mono<String> processWebhook(Long roomId, FilePart filePart);

    Mono<String> handleObjFileUpload(Long roomId, FilePart filePart);

    WebhookRequest handleWebhookData(Long roomId, String file); // 변경된 메서드

}
