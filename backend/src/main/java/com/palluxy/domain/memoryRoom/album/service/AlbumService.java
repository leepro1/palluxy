package com.palluxy.domain.memoryRoom.album.service;

import com.palluxy.domain.memoryRoom.album.dto.AlbumDto;
import com.palluxy.domain.memoryRoom.album.dto.ImageDto;
import java.util.List;

public interface AlbumService {
    AlbumDto createAlbum(Long roomId, AlbumDto albumDto);
    AlbumDto getAlbumById(Long albumId);
    List<AlbumDto> getAllAlbumsByRoomId(Long roomId);
    AlbumDto updateAlbum(Long albumId, AlbumDto albumDto);
    void deleteAlbum(Long albumId);
    ImageDto addImageToAlbum(Long albumId, ImageDto imageDto);
}
