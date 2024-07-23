package com.palluxy.domain.memoryRoom.petmeta.service;

import com.palluxy.domain.memoryRoom.petmeta.dto.PetMetaDto;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.util.List;

public interface PetMetaService {
  PetMetaDto createPetMeta(PetMetaDto petMetaDto, Long roomId);
  PetMetaDto getPetMetaById(Long petMetaId);
  List<PetMetaDto> getPetMetaByRoomId(Long roomId);
  PetMetaDto updatePetMeta(Long petMetaId, PetMetaDto petMetaDto);
  PetMetaDto updatePetMetaPositionRotation(Long petMetaId, double positionX, double positionY, double positionZ, double rotationX, double rotationY, double rotationZ);
  void deletePetMeta(Long petMetaId);
  Mono<Void> uploadImageToDjango(Long roomId, MultipartFile file); // Django 서버에 이미지 업로드
  Mono<String> handleObjFileUpload(Long roomId, FilePart filePart); // Django 서버로부터 obj 파일 받기
}
