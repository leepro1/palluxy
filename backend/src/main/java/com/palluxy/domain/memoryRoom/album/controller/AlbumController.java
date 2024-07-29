package com.palluxy.domain.memoryRoom.album.controller;

import com.palluxy.domain.memoryRoom.album.dto.AlbumDto;
import com.palluxy.domain.memoryRoom.album.service.AlbumService;
import com.palluxy.global.common.CommonResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/albums")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    @PostMapping("/{roomId}")
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<AlbumDto> createAlbum(@PathVariable Long roomId, @RequestBody AlbumDto albumDto) {
        albumDto.setRoomId(roomId);  // Set the roomId from the path variable to the DTO
        AlbumDto createdAlbum = albumService.createAlbum(albumDto);
        return CommonResponse.created("Album created successfully");
    }

    @GetMapping("/{albumId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<AlbumDto> getAlbum(@PathVariable Long albumId) {
        AlbumDto album = albumService.getAlbumById(albumId);
        return CommonResponse.ok("Album retrieved successfully", album);
    }

    @GetMapping("/room/{roomId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<AlbumDto> getAlbumByRoom(@PathVariable Long roomId) {
        AlbumDto album = albumService.getAlbumByRoomId(roomId);
        return CommonResponse.ok("Album retrieved successfully", album);
    }

    @PutMapping("/{albumId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<AlbumDto> updateAlbum(@PathVariable Long albumId, @Valid @RequestBody AlbumDto albumDto) {
        AlbumDto updatedAlbum = albumService.updateAlbum(albumId, albumDto);
        return CommonResponse.ok("Album updated successfully", updatedAlbum);
    }

    @DeleteMapping("/{albumId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<Void> deleteAlbum(@PathVariable Long albumId) {
        albumService.deleteAlbum(albumId);
        return CommonResponse.ok("Album deleted successfully");
    }
}
