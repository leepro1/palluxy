package com.palluxy.domain.memoryRoom.petmeta.service;

import com.palluxy.domain.memoryRoom.petmeta.dto.PetMetaDto;
import com.palluxy.domain.memoryRoom.petmeta.entity.PetMeta;
import com.palluxy.domain.memoryRoom.petmeta.repository.PetMetaRepository;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetMetaServiceImpl implements PetMetaService {

  @Autowired
  private PetMetaRepository petMetaRepository;

  @Autowired
  private RoomRepository roomRepository;

  @Override
  public PetMetaDto createPetMeta(PetMetaDto petMetaDto, Long roomId) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));

    PetMeta petMeta = new PetMeta();
    petMeta.setObjFilePath(petMetaDto.getObjFilePath());
    petMeta.setPositionX(0.0);
    petMeta.setPositionY(0.0);
    petMeta.setPositionZ(0.0);
    petMeta.setRotationX(0.0);
    petMeta.setRotationY(0.0);
    petMeta.setRotationZ(0.0);
    petMeta.setRoom(room);

    petMeta = petMetaRepository.save(petMeta);
    return new PetMetaDto(petMeta);
  }

  @Override
  public PetMetaDto getPetMetaById(Long petMetaId) {
    PetMeta petMeta = petMetaRepository.findById(petMetaId)
        .orElseThrow(() -> new IllegalArgumentException("PetMeta not found"));
    return new PetMetaDto(petMeta);
  }

  @Override
  public List<PetMetaDto> getPetMetaByRoomId(Long roomId) {
    List<PetMeta> petMetas = petMetaRepository.findByRoom_RoomId(roomId);
    return petMetas.stream().map(PetMetaDto::new).collect(Collectors.toList());
  }

  @Override
  public PetMetaDto updatePetMeta(Long petMetaId, PetMetaDto petMetaDto) {
    PetMeta petMeta = petMetaRepository.findById(petMetaId)
        .orElseThrow(() -> new IllegalArgumentException("PetMeta not found"));

    petMeta.setObjFilePath(petMetaDto.getObjFilePath());
    petMeta.setPositionX(petMetaDto.getPositionX());
    petMeta.setPositionY(petMetaDto.getPositionY());
    petMeta.setPositionZ(petMetaDto.getPositionZ());
    petMeta.setRotationX(petMetaDto.getRotationX());
    petMeta.setRotationY(petMetaDto.getRotationY());
    petMeta.setRotationZ(petMetaDto.getRotationZ());

    petMeta = petMetaRepository.save(petMeta);
    return new PetMetaDto(petMeta);
  }

  @Override
  public PetMetaDto updatePetMetaPositionRotation(Long petMetaId, double positionX, double positionY, double positionZ, double rotationX, double rotationY, double rotationZ) {
    PetMeta petMeta = petMetaRepository.findById(petMetaId)
        .orElseThrow(() -> new IllegalArgumentException("PetMeta not found"));

    petMeta.setPositionX(positionX);
    petMeta.setPositionY(positionY);
    petMeta.setPositionZ(positionZ);
    petMeta.setRotationX(rotationX);
    petMeta.setRotationY(rotationY);
    petMeta.setRotationZ(rotationZ);

    petMeta = petMetaRepository.save(petMeta);
    return new PetMetaDto(petMeta);
  }

  @Override
  public void deletePetMeta(Long petMetaId) {
    petMetaRepository.deleteById(petMetaId);
  }
}
