package com.palluxy.domain.memoryRoom.album.controller;

import com.palluxy.domain.memoryRoom.album.dto.ImageDto;
import com.palluxy.domain.memoryRoom.album.service.FileStorageService;
import com.palluxy.domain.memoryRoom.album.service.ImageService;
import com.palluxy.global.common.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

  @Autowired
  private ImageService imageService;

  @Autowired
  private FileStorageService fileStorageService;

  @PostMapping("/album/{albumId}")
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<ImageDto> createImage(@PathVariable Long albumId, @RequestParam("file") MultipartFile file) {
    try {
      String filePath = fileStorageService.storeFile(file);
      ImageDto imageDto = new ImageDto();
      imageDto.setUrl(filePath);
      ImageDto createdImage = imageService.createImage(imageDto, albumId);
      return CommonResponse.created("Image added successfully");
    } catch (IOException e) {
      return CommonResponse.badRequest("Failed to upload image");
    }
  }

  @GetMapping("/{imageId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<ImageDto> getImage(@PathVariable Long imageId) {
    ImageDto image = imageService.getImageById(imageId);
    return CommonResponse.ok("Image retrieved successfully", image);
  }

  @GetMapping("/album/{albumId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<List<ImageDto>> getImagesByAlbum(@PathVariable Long albumId) {
    List<ImageDto> images = imageService.getAllImagesByAlbumId(albumId);
    return CommonResponse.ok("Images retrieved successfully", images);
  }

  @PutMapping("/{imageId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<ImageDto> updateImage(@PathVariable Long imageId, @Valid @RequestBody ImageDto imageDto) {
    ImageDto updatedImage = imageService.updateImage(imageId, imageDto);
    return CommonResponse.ok("Image updated successfully", updatedImage);
  }

  @DeleteMapping("/{imageId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<Void> deleteImage(@PathVariable Long imageId) {
    imageService.deleteImage(imageId);
    return CommonResponse.ok("Image deleted successfully");
  }
}
