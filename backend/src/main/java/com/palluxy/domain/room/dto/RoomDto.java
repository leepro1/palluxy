package com.palluxy.domain.room.dto;

import com.palluxy.domain.room.entity.Room;
import lombok.Data;

@Data
public class RoomDto {

    private Long id;
    private String name;
    private String description;

    public RoomDto() {}

    public RoomDto(Room room) {
        this.id = room.getId();
        this.name = room.getName();
        this.description = room.getDescription();
    }
}
