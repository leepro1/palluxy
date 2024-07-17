package com.palluxy.domain.memoryRoom.album.service;

import com.palluxy.domain.memoryRoom.album.dto.ImageDto;
import java.util.List;

public interface ImageService {
  ImageDto createImage(ImageDto imageDto, Long albumId);
  ImageDto getImageById(Long imageId);
  List<ImageDto> getAllImagesByAlbumId(Long albumId);
  ImageDto updateImage(Long imageId, ImageDto imageDto);
  void deleteImage(Long imageId);
}
