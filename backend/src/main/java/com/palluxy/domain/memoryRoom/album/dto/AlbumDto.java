package com.palluxy.domain.memoryRoom.album.dto;

import com.palluxy.domain.memoryRoom.album.entity.Album;
import lombok.Data;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class AlbumDto {

    private Long albumId;
    private String title;
    private Long roomId;
    private List<ImageDto> images;

    public AlbumDto() {}

    public AlbumDto(Album album) {
        this.albumId = album.getAlbumId();
        this.title = album.getTitle();
        this.roomId = album.getRoom().getRoomId();
        this.images = album.getImages().stream().map(ImageDto::new).collect(Collectors.toList());
    }
}
