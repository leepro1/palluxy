package com.palluxy.domain.memoryRoom.like.controller;

import com.palluxy.domain.memoryRoom.like.dto.LikeDto;
import com.palluxy.domain.memoryRoom.like.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/room/{roomId}/user/{userId}")
    public LikeDto addLike(@PathVariable Long roomId, @PathVariable Long userId) {
        return likeService.addLike(roomId, userId);
    }

    @DeleteMapping("/room/{roomId}/user/{userId}")
    public void removeLike(@PathVariable Long roomId, @PathVariable Long userId) {
        likeService.removeLike(roomId, userId);
    }

    @GetMapping("/user/{userId}")
    public List<LikeDto> getLikesByUser(@PathVariable Long userId) {
        return likeService.getLikesByUserId(userId);
    }
}
