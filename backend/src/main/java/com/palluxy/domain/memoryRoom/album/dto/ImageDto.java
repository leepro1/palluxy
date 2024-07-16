package com.palluxy.domain.memoryRoom.album.dto;

import com.palluxy.domain.memoryRoom.album.entity.Image;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ImageDto {

  private Long imageId;

  @NotNull
  private String url;

  private double angle;

  private Long albumId;

  public ImageDto() {}

  public ImageDto(Image image) {
    this.imageId = image.getImageId();
    this.url = image.getUrl();
    this.angle = image.getAngle();
    this.albumId = image.getAlbum().getAlbumId();
  }
}
