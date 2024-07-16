package com.palluxy.domain.memoryRoom.album.dto;

import com.palluxy.domain.memoryRoom.album.entity.Image;
import lombok.Data;

@Data
public class ImageDto {

  private Long imageId;
  private String url;
  private Long albumId;

  public ImageDto() {}

  public ImageDto(Image image) {
    this.imageId = image.getImageId();
    this.url = image.getUrl();
    this.albumId = image.getAlbum().getAlbumId();
  }
}
