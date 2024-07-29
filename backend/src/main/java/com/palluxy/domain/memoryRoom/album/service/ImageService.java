package com.palluxy.domain.memoryRoom.album.service;

import com.palluxy.domain.memoryRoom.album.dto.ImageDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
  ImageDto createImage(ImageDto imageDto, Long albumId);
  ImageDto getImageById(Long imageId);
  List<ImageDto> getAllImagesByAlbumId(Long albumId);
  ImageDto updateImage(Long imageId, ImageDto imageDto);
  void deleteImage(Long imageId);
  String storeFileInFolder(MultipartFile file, String folderName) throws IOException;
}
