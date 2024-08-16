package com.palluxy.domain.memoryRoom.room.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * Room 생성 요청 DTO
 */
@Data
public class RoomCreateRequest {

    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    private int backgroundMusic;
    private int type;
    private int likeCount;
    private Long userId;
    private MultipartFile file;

    public RoomDto toRoomDto(String thumbnailUrl) {
        RoomDto roomDto = new RoomDto();
        roomDto.setName(this.name);
        roomDto.setDescription(this.description);
        roomDto.setBackgroundMusic(this.backgroundMusic);
        roomDto.setType(this.type);
        roomDto.setLikeCount(this.likeCount);
        roomDto.setUserId(this.userId);
        roomDto.setThumbnailUrl(thumbnailUrl);
        return roomDto;
    }
}
