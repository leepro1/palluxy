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

  @Autowired
  private ImageService imageService;

  @Autowired
  private FileStorageService fileStorageService;

  // /api/albums/{albumId}/images/temp
  // 실제 사용자가 이미지를 업로드하는 메서드
  @PostMapping("/temp")
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<String> uploadTempImage(@RequestParam("file") MultipartFile file) {
    try {
      String tempFilePath = fileStorageService.storeTempFile(file);
      return CommonResponse.created("Temp image uploaded successfully");
    } catch (IOException e) {
      return CommonResponse.badRequest("Failed to upload temp image");
    }
  }

  // 사용자가 저장버튼을 눌렀을때 실행되는 메서드
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<ImageDto> createImage(@PathVariable Long albumId, @RequestParam("tempFilePath") String tempFilePath) {
    try {
      String filePath = fileStorageService.storeFileFromTemp(tempFilePath);
      ImageDto imageDto = new ImageDto();
      imageDto.setUrl(filePath);
      imageDto.setAngle(0.0); // angle을 0으로 고정
      ImageDto createdImage = imageService.createImage(imageDto, albumId);
      return CommonResponse.created("Image added successfully");
    } catch (IOException e) {
      return CommonResponse.badRequest("Failed to upload image");
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

  // 전체 수정
  @PutMapping("/{imageId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<ImageDto> updateImage(@PathVariable Long albumId, @PathVariable Long imageId, @Valid @RequestBody ImageDto imageDto) {
    ImageDto updatedImage = imageService.updateImage(imageId, imageDto);
    return CommonResponse.ok("Image updated successfully", updatedImage);
  }

  // 각도에 대한 수정
  @PutMapping("/{imageId}/angle")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<ImageDto> updateImageAngle(@PathVariable Long albumId, @PathVariable Long imageId, @RequestParam("angle") double angle) {
    ImageDto imageDto = imageService.getImageById(imageId);
    imageDto.setAngle(angle);
    ImageDto updatedImage = imageService.updateImage(imageId, imageDto);
    return CommonResponse.ok("Image angle updated successfully", updatedImage);
  }

  // 이미지에 대한 수정
  @PutMapping("/{imageId}/url")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<ImageDto> updateImageUrl(@PathVariable Long albumId, @PathVariable Long imageId, @RequestParam("file") MultipartFile file) {
    try {
      String filePath = fileStorageService.storeFile(file);
      ImageDto imageDto = imageService.getImageById(imageId);
      imageDto.setUrl(filePath);
      ImageDto updatedImage = imageService.updateImage(imageId, imageDto);
      return CommonResponse.ok("Image URL updated successfully", updatedImage);
    } catch (IOException e) {
      return CommonResponse.badRequest("Failed to upload image");
    }
  }

  // 이미지 인덱스 수정
  @PutMapping("/{imageId}/index")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<ImageDto> updateImageIndex(@PathVariable Long albumId, @PathVariable Long imageId, @RequestParam("index") int index) {
    ImageDto imageDto = imageService.getImageById(imageId);
    imageDto.setIndex(index);
    ImageDto updatedImage = imageService.updateImage(imageId, imageDto);
    return CommonResponse.ok("Image index updated successfully", updatedImage);
  }

  @DeleteMapping("/{imageId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<Void> deleteImage(@PathVariable Long albumId, @PathVariable Long imageId) {
    imageService.deleteImage(imageId);
    return CommonResponse.ok("Image deleted successfully");
  }
}
