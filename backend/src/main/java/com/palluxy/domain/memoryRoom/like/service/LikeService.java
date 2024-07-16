package com.palluxy.domain.memoryRoom.like.service;

import com.palluxy.domain.memoryRoom.like.dto.LikeDto;

import java.util.List;

public interface LikeService {
    LikeDto addLike(Long roomId, Long userId);
    void removeLike(Long roomId, Long userId);
    List<LikeDto> getLikesByUserId(Long userId);
}
