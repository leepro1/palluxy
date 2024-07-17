package com.palluxy.domain.memoryRoom.petmeta.service;

import com.palluxy.domain.memoryRoom.petmeta.dto.PetMetaDto;

import java.util.List;

public interface PetMetaService {

  PetMetaDto createPetMeta(PetMetaDto petMetaDto, Long roomId);

  PetMetaDto getPetMetaById(Long petMetaId);

  List<PetMetaDto> getPetMetaByRoomId(Long roomId);

  PetMetaDto updatePetMeta(Long petMetaId, PetMetaDto petMetaDto);

  PetMetaDto updatePetMetaPositionRotation(Long petMetaId, double positionX, double positionY, double positionZ, double rotationX, double rotationY, double rotationZ);

  void deletePetMeta(Long petMetaId);
}
