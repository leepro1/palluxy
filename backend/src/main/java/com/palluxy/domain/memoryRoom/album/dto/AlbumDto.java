package com.palluxy.domain.memoryRoom.album.dto;

import com.palluxy.domain.memoryRoom.album.entity.Album;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class AlbumDto {

    private Long albumId;

    @NotNull
    private Long roomId;

    private String filePath;
    private double angle;
    private List<ImageDto> images;

    public AlbumDto() {}

    public AlbumDto(Album album) {
        this.albumId = album.getAlbumId();
        this.roomId = album.getRoom().getRoomId();
        this.filePath = album.getFilePath();
        this.angle = album.getAngle();
        this.images = album.getImages().stream().map(ImageDto::new).collect(Collectors.toList());
    }
}
