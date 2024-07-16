package com.palluxy.domain.memoryRoom.album.dto;

import com.palluxy.domain.memoryRoom.album.entity.Image;
import lombok.Data;

@Data
public class ImageDto {

  private Long id;
  private String url;

  public ImageDto() {}

  public ImageDto(Image image) {
    this.id = image.getId();
    this.url = image.getUrl();
  }
}
