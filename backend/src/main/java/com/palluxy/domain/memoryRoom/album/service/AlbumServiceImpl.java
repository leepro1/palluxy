package com.palluxy.domain.memoryRoom.album.service;

import com.palluxy.domain.memoryRoom.album.dto.AlbumDto;
import com.palluxy.domain.memoryRoom.album.entity.Album;
import com.palluxy.domain.memoryRoom.album.repository.AlbumRepository;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlbumServiceImpl implements AlbumService {

  @Autowired
  private AlbumRepository albumRepository;

  @Autowired
  private RoomRepository roomRepository;

  @Override
  public AlbumDto createAlbum(AlbumDto albumDto) {
    Room room = roomRepository.findById(albumDto.getRoomId())
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    if (room.getAlbum() != null) {
      throw new IllegalArgumentException("Album already exists for this room");
    }
    Album album = new Album();
    album.setRoom(room);
    album.setFilePath(albumDto.getFilePath());
    album.setAngle(albumDto.getAngle());

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
  public AlbumDto getAlbumByRoomId(Long roomId) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    Album album = room.getAlbum();
    if (album == null) {
      throw new IllegalArgumentException("Album not found for this room");
    }
    return new AlbumDto(album);
  }

  @Override
  public AlbumDto updateAlbum(Long albumId, AlbumDto albumDto) {
    Album album = albumRepository.findById(albumId)
        .orElseThrow(() -> new IllegalArgumentException("Album not found"));
    album.setFilePath(albumDto.getFilePath());
    album.setAngle(albumDto.getAngle());

    album = albumRepository.save(album);
    return new AlbumDto(album);
  }

  @Override
  public void deleteAlbum(Long albumId) {
    albumRepository.deleteById(albumId);
  }
}
