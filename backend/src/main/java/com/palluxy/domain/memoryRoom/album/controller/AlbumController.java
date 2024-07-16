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

    @GetMapping("/{id}")
    public AlbumDto getAlbum(@PathVariable Long id) {
        return albumService.getAlbumById(id);
    }

    @GetMapping("/room/{roomId}")
    public List<AlbumDto> getAllAlbumsByRoomId(@PathVariable Long roomId) {
        return albumService.getAllAlbumsByRoomId(roomId);
    }

    @PutMapping("/{id}")
    public AlbumDto updateAlbum(@PathVariable Long id, @RequestBody AlbumDto albumDto) {
        return albumService.updateAlbum(id, albumDto);
    }

    @DeleteMapping("/{id}")
    public void deleteAlbum(@PathVariable Long id) {
        albumService.deleteAlbum(id);
    }

    @PostMapping("/{albumId}/images")
    public ImageDto addImageToAlbum(@PathVariable Long albumId, @RequestBody ImageDto imageDto) {
        return albumService.addImageToAlbum(albumId, imageDto);
    }
}
