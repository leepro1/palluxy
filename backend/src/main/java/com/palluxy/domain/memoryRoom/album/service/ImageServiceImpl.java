package com.palluxy.domain.memoryRoom.album.service;

import com.palluxy.domain.memoryRoom.album.dto.ImageDto;
import com.palluxy.domain.memoryRoom.album.entity.Album;
import com.palluxy.domain.memoryRoom.album.entity.Image;
import com.palluxy.domain.memoryRoom.album.repository.AlbumRepository;
import com.palluxy.domain.memoryRoom.album.repository.ImageRepository;
import com.palluxy.global.config.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageServiceImpl implements ImageService {

  @Autowired
  private ImageRepository imageRepository;

  @Autowired
  private AlbumRepository albumRepository;

  @Autowired
  private FileStorageService fileStorageService;

  @Override
  public ImageDto createImage(ImageDto imageDto, Long albumId) {
    Album album = albumRepository.findById(albumId)
        .orElseThrow(() -> new IllegalArgumentException("Album not found"));

    Image image = new Image();
    image.setUrl(imageDto.getUrl());
    image.setAngle(imageDto.getAngle());
    image.setImageIndex(imageDto.getIndex());
    image.setAlbum(album);

    Image savedImage = imageRepository.save(image);
    return new ImageDto(savedImage);
  }

  @Override
  public ImageDto getImageById(Long imageId) {
    Image image = imageRepository.findById(imageId)
        .orElseThrow(() -> new IllegalArgumentException("Image not found"));
    return new ImageDto(image);
  }

  @Override
  public List<ImageDto> getAllImagesByAlbumId(Long albumId) {
    List<Image> images = imageRepository.findByAlbum_AlbumId(albumId);
    return images.stream().map(ImageDto::new).collect(Collectors.toList());
  }

  @Override
  public ImageDto updateImage(Long imageId, ImageDto imageDto) {
    Image image = imageRepository.findById(imageId)
        .orElseThrow(() -> new IllegalArgumentException("Image not found"));

    image.setUrl(imageDto.getUrl());
    image.setAngle(imageDto.getAngle());
    image.setImageIndex(imageDto.getIndex());

    Image updatedImage = imageRepository.save(image);
    return new ImageDto(updatedImage);
  }

  @Override
  public void deleteImage(Long imageId) {
    Image image = imageRepository.findById(imageId)
        .orElseThrow(() -> new IllegalArgumentException("Image not found"));

    String fileName = image.getUrl().substring(image.getUrl().lastIndexOf("/") + 1);
    try {
      fileStorageService.deleteFileFromS3(fileName);
    } catch (Exception e) {
      throw new RuntimeException("Failed to delete image from S3", e);
    }

    imageRepository.delete(image);
  }

  @Override
  public String storeFileInFolder(MultipartFile file, String folderName) throws IOException {
    return fileStorageService.storeFile(file, folderName);
  }
}
