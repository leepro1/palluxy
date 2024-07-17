package com.palluxy.domain.memoryRoom.album.service;

import com.palluxy.domain.memoryRoom.album.dto.ImageDto;
import com.palluxy.domain.memoryRoom.album.entity.Image;
import com.palluxy.domain.memoryRoom.album.repository.ImageRepository;
import com.palluxy.domain.memoryRoom.album.entity.Album;
import com.palluxy.domain.memoryRoom.album.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageServiceImpl implements ImageService {

  @Autowired
  private ImageRepository imageRepository;

  @Autowired
  private AlbumRepository albumRepository;

  @Override
  public ImageDto createImage(ImageDto imageDto, Long albumId) {
    Album album = albumRepository.findById(albumId)
        .orElseThrow(() -> new IllegalArgumentException("Album not found"));

    if (album.getImages().size() >= 6) {
      throw new IllegalArgumentException("Cannot add more than 6 images to an album");
    }

    Image image = new Image();
    image.setUrl(imageDto.getUrl());
    image.setAngle(0.0); // angle을 0으로 고정
    image.setImageIndex(album.getImages().size()); // 인덱스 설정
    image.setAlbum(album);

    image = imageRepository.save(image);
    return new ImageDto(image);
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
    image.setAngle(imageDto.getAngle()); // 업데이트 시 angle은 DTO의 값을 사용

    image = imageRepository.save(image);
    return new ImageDto(image);
  }

  @Override
  public void deleteImage(Long imageId) {
    imageRepository.deleteById(imageId);
  }
}
