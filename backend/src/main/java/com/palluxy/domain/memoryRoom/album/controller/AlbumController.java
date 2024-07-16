package com.palluxy.domain.memoryRoom.album.controller;

import com.palluxy.domain.memoryRoom.album.dto.AlbumDto;
import com.palluxy.domain.memoryRoom.album.dto.ImageDto;
import com.palluxy.domain.memoryRoom.album.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    @PostMapping("/room/{roomId}")
    public AlbumDto createAlbum(@PathVariable Long roomId, @RequestBody AlbumDto albumDto) {
        return albumService.createAlbum(roomId, albumDto);
    }

    @GetMapping("/{albumId}")
    public AlbumDto getAlbum(@PathVariable Long albumId) {
        return albumService.getAlbumById(albumId);
    }

    @GetMapping("/room/{roomId}")
    public List<AlbumDto> getAllAlbumsByRoomId(@PathVariable Long roomId) {
        return albumService.getAllAlbumsByRoomId(roomId);
    }

    @PutMapping("/{albumId}")
    public AlbumDto updateAlbum(@PathVariable Long albumId, @RequestBody AlbumDto albumDto) {
        return albumService.updateAlbum(albumId, albumDto);
    }

    @DeleteMapping("/{albumId}")
    public void deleteAlbum(@PathVariable Long albumId) {
        albumService.deleteAlbum(albumId);
    }

    @PostMapping("/{albumId}/images")
    public ImageDto addImageToAlbum(@PathVariable Long albumId, @RequestBody ImageDto imageDto) {
        return albumService.addImageToAlbum(albumId, imageDto);
    }
}
