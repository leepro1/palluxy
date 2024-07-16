package com.palluxy.domain.memoryRoom.album.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Image {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long imageId;

  private String url;
  private double angle;

  @ManyToOne
  @JoinColumn(name = "album_id")
  private Album album;
}
