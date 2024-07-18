package com.palluxy.domain.memoryRoom.like.dto;

import com.palluxy.domain.memoryRoom.like.entity.Like;
import lombok.Data;

@Data
public class LikeDto {

    private Long likeId;
    private Long roomId;
    private Long userId;

    public LikeDto() {}

    public LikeDto(Like like) {
        this.likeId = like.getLikeId();
        this.roomId = like.getRoom().getRoomId();
        this.userId = like.getUser().getId();
    }
}
