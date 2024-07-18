package com.palluxy.domain.memoryRoom.room.dto;

import com.palluxy.domain.memoryRoom.room.entity.Room;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RoomDto {

    private Long roomId;

    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    private String thumbnailUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int backgroundMusic;
    private int type;

    private Long userId;

    public RoomDto() {}

    public RoomDto(Room room) {
        this.roomId = room.getRoomId();
        this.name = room.getName();
        this.description = room.getDescription();
        this.thumbnailUrl = room.getThumbnailUrl();
        this.createdAt = room.getCreatedAt();
        this.updatedAt = room.getUpdatedAt();
        this.backgroundMusic = room.getBackgroundMusic();
        this.type = room.getType();
        this.userId = room.getUser().getId();
    }
}
