package com.palluxy.domain.memoryRoom.album.service;

import com.palluxy.domain.memoryRoom.album.dto.AlbumDto;
import java.util.List;

public interface AlbumService {
    AlbumDto createAlbum(AlbumDto albumDto);
    AlbumDto getAlbumById(Long albumId);
    AlbumDto getAlbumByRoomId(Long roomId);
    AlbumDto updateAlbum(Long albumId, AlbumDto albumDto);
    void deleteAlbum(Long albumId);
}
