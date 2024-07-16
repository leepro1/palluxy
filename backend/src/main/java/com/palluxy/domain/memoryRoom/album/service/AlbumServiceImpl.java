package com.palluxy.domain.memoryRoom.album.service;

import com.palluxy.domain.memoryRoom.album.dto.AlbumDto;
import com.palluxy.domain.memoryRoom.album.dto.ImageDto;
import com.palluxy.domain.memoryRoom.album.entity.Album;
import com.palluxy.domain.memoryRoom.album.entity.Image;
import com.palluxy.domain.memoryRoom.album.repository.AlbumRepository;
import com.palluxy.domain.memoryRoom.album.repository.ImageRepository;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlbumServiceImpl implements AlbumService {

  @Autowired
  private AlbumRepository albumRepository;

  @Autowired
  private ImageRepository imageRepository;

  @Autowired
  private RoomRepository roomRepository;

  @Override
  public AlbumDto createAlbum(Long roomId, AlbumDto albumDto) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    Album album = new Album();
    album.setTitle(albumDto.getTitle());
    album.setRoom(room);
    album = albumRepository.save(album);
    return new AlbumDto(album);
  }

  @Override
  public AlbumDto getAlbumById(Long albumId) {
    Album album = albumRepository.findById(albumId)
        .orElseThrow(() -> new IllegalArgumentException("Album not found"));
    return new AlbumDto(album);
  }

  @Override
  public List<AlbumDto> getAllAlbumsByRoomId(Long roomId) {
    List<Album> albums = albumRepository.findByRoomId(roomId);
    return albums.stream().map(AlbumDto::new).collect(Collectors.toList());
  }

  @Override
  public AlbumDto updateAlbum(Long albumId, AlbumDto albumDto) {
    Album album = albumRepository.findById(albumId)
        .orElseThrow(() -> new IllegalArgumentException("Album not found"));
    album.setTitle(albumDto.getTitle());
    album = albumRepository.save(album);
    return new AlbumDto(album);
  }

  @Override
  public void deleteAlbum(Long albumId) {
    albumRepository.deleteById(albumId);
  }

  @Override
  public ImageDto addImageToAlbum(Long albumId, ImageDto imageDto) {
    Album album = albumRepository.findById(albumId)
        .orElseThrow(() -> new IllegalArgumentException("Album not found"));
    Image image = new Image();
    image.setUrl(imageDto.getUrl());
    image.setAlbum(album);
    image = imageRepository.save(image);
    return new ImageDto(image);
  }
}
