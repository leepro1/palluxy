package com.palluxy.domain.memoryRoom.petmeta.dto;

import com.palluxy.domain.memoryRoom.petmeta.entity.PetMeta;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PetMetaDto {

  private Long petMetaId;

  @NotNull
  private String objFilePath;

  private double positionX;
  private double positionY;
  private double positionZ;
  private double rotationX;
  private double rotationY;
  private double rotationZ;
  private Long roomId;

  public PetMetaDto() {}

  public PetMetaDto(PetMeta petMeta) {
    this.petMetaId = petMeta.getPetMetaId();
    this.objFilePath = petMeta.getObjFilePath();
    this.positionX = petMeta.getPositionX();
    this.positionY = petMeta.getPositionY();
    this.positionZ = petMeta.getPositionZ();
    this.rotationX = petMeta.getRotationX();
    this.rotationY = petMeta.getRotationY();
    this.rotationZ = petMeta.getRotationZ();
    this.roomId = petMeta.getRoom().getRoomId();
  }
}
