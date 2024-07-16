package com.palluxy.domain.memoryRoom.album.service;

import com.palluxy.domain.memoryRoom.album.dto.AlbumDto;
import com.palluxy.domain.memoryRoom.album.dto.ImageDto;

import java.util.List;

public interface AlbumService {
    AlbumDto createAlbum(Long roomId, AlbumDto albumDto);
    AlbumDto getAlbumById(Long id);
    List<AlbumDto> getAllAlbumsByRoomId(Long roomId);
    AlbumDto updateAlbum(Long id, AlbumDto albumDto);
    void deleteAlbum(Long id);
    ImageDto addImageToAlbum(Long albumId, ImageDto imageDto);
}
