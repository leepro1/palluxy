package com.palluxy.domain.memoryRoom.like.controller;

import com.palluxy.domain.memoryRoom.like.dto.LikeDto;
import com.palluxy.domain.memoryRoom.like.service.LikeService;
import com.palluxy.global.common.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/room/{roomId}/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<LikeDto> addLike(@PathVariable Long roomId, @PathVariable Long userId) {
        LikeDto likeDto = likeService.addLike(roomId, userId);
        return CommonResponse.ok("Like added successfully", likeDto);
    }

    @DeleteMapping("/room/{roomId}/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<Void> removeLike(@PathVariable Long roomId, @PathVariable Long userId) {
        likeService.removeLike(roomId, userId);
        return CommonResponse.ok("Like removed successfully");
    }

    @GetMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<List<LikeDto>> getLikesByUser(@PathVariable Long userId) {
        List<LikeDto> likes = likeService.getLikesByUserId(userId);
        return CommonResponse.ok("Likes retrieved successfully", likes);
    }
}
