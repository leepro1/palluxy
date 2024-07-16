package com.palluxy.domain.memoryRoom.album.dto;

import com.palluxy.domain.memoryRoom.album.entity.Album;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class AlbumDto {

    private Long id;
    private String title;
    private List<ImageDto> images;

    public AlbumDto() {}

    public AlbumDto(Album album) {
        this.id = album.getId();
        this.title = album.getTitle();
        this.images = album.getImages().stream().map(ImageDto::new).collect(Collectors.toList());
    }
}
