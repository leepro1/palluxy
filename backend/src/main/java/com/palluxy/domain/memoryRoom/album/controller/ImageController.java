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
@RequestMapping("/api/albums/{albumId}/images")
public class ImageController {

  @Autowired private ImageService imageService;

  @Autowired private FileStorageService fileStorageService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<ImageDto> createImage(
      @PathVariable Long albumId,
      @RequestParam("file") MultipartFile file,
      @RequestParam("index") int index) {
    try {
      String fileName = fileStorageService.storeFile(file);
      String fileUrl = fileStorageService.getFileUrl(fileName);
      ImageDto imageDto = new ImageDto();
      imageDto.setUrl(fileUrl);
      imageDto.setAngle(0.0); // angle을 0으로 고정
      imageDto.setIndex(index); // index 설정
      ImageDto createdImage = imageService.createImage(imageDto, albumId);

      return CommonResponse.created("Image added successfully");
    } catch (IOException e) {
      return CommonResponse.badRequest("Failed to upload image");
    } catch (IllegalArgumentException e) {
      return CommonResponse.badRequest(e.getMessage());
    }
  }

  @GetMapping("/{imageId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<ImageDto> getImage(@PathVariable Long albumId, @PathVariable Long imageId) {
    ImageDto image = imageService.getImageById(imageId);
    return CommonResponse.ok("Image retrieved successfully", image);
  }

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<List<ImageDto>> getImagesByAlbum(@PathVariable Long albumId) {
    List<ImageDto> images = imageService.getAllImagesByAlbumId(albumId);
    return CommonResponse.ok("Images retrieved successfully", images);
  }

  @PutMapping("/{imageId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<ImageDto> updateImage(
      @PathVariable Long albumId,
      @PathVariable Long imageId,
      @Valid @RequestBody ImageDto imageDto) {
    try {
      ImageDto updatedImage = imageService.updateImage(imageId, imageDto);
      return CommonResponse.ok("Image updated successfully", updatedImage);
    } catch (IllegalArgumentException e) {
      return CommonResponse.badRequest(e.getMessage());
    }
  }

  @PutMapping("/{imageId}/angle")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<ImageDto> updateImageAngle(
      @PathVariable Long albumId, @PathVariable Long imageId, @RequestParam("angle") double angle) {
    ImageDto imageDto = imageService.getImageById(imageId);
    imageDto.setAngle(angle);
    ImageDto updatedImage = imageService.updateImage(imageId, imageDto);
    return CommonResponse.ok("Image angle updated successfully", updatedImage);
  }

  @PutMapping("/{imageId}/url")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<ImageDto> updateImageUrl(
      @PathVariable Long albumId,
      @PathVariable Long imageId,
      @RequestParam("file") MultipartFile file) {
    try {
      String fileName = fileStorageService.storeFile(file);
      String fileUrl = fileStorageService.getFileUrl(fileName);
      ImageDto imageDto = imageService.getImageById(imageId);
      imageDto.setUrl(fileUrl);
      ImageDto updatedImage = imageService.updateImage(imageId, imageDto);
      return CommonResponse.ok("Image URL updated successfully", updatedImage);
    } catch (IOException e) {
      return CommonResponse.badRequest("Failed to upload image");
    }
  }

  @PutMapping("/{imageId}/index")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<ImageDto> updateImageIndex(
      @PathVariable Long albumId, @PathVariable Long imageId, @RequestParam("index") int index) {
    try {
      ImageDto imageDto = imageService.getImageById(imageId);
      imageDto.setIndex(index);
      ImageDto updatedImage = imageService.updateImage(imageId, imageDto);
      return CommonResponse.ok("Image index updated successfully", updatedImage);
    } catch (IllegalArgumentException e) {
      return CommonResponse.badRequest(e.getMessage());
    }
  }

  @DeleteMapping("/{imageId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<Void> deleteImage(@PathVariable Long albumId, @PathVariable Long imageId) {
    ImageDto imageDto = imageService.getImageById(imageId);
    String fileUrl = imageDto.getUrl();
    String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
    fileStorageService.deleteFileFromS3(fileName);
    imageService.deleteImage(imageId);
    return CommonResponse.ok("Image deleted successfully");
  }
}
