package com.palluxy.domain.memoryRoom.like.dto;

import com.palluxy.domain.memoryRoom.like.entity.Like;
import lombok.Data;

@Data
public class LikeDto {

    private Long id;
    private Long roomId;
    private Long userId;

    public LikeDto() {}

    public LikeDto(Like like) {
        this.id = like.getId();
        this.roomId = like.getRoom().getId();
        this.userId = like.getUser().getId();
    }
}
