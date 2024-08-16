package com.palluxy.domain.memoryRoom.petmeta.entity;

import com.palluxy.domain.memoryRoom.room.entity.Room;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class PetMeta {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long petMetaId;

  private String objFilePath;
  private double positionX;
  private double positionY;
  private double positionZ;
  private double rotationX;
  private double rotationY;
  private double rotationZ;

  @ManyToOne
  @JoinColumn(name = "room_id")
  private Room room;
}
