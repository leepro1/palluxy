package com.palluxy.domain.memoryRoom.room.controller;

import com.palluxy.domain.memoryRoom.room.dto.RoomCreateRequest;
import com.palluxy.domain.memoryRoom.room.dto.RoomDto;
import com.palluxy.domain.memoryRoom.room.service.RoomService;
import com.palluxy.global.common.data.CommonResponse;
import com.palluxy.global.config.FileStorageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

/**
 * Room 관련 API 엔드포인트 컨트롤러
 */
@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<RoomDto> createRoom(@ModelAttribute @Valid RoomCreateRequest request) {
        try {
            String fileUrl = null;
            if (request.getFile() != null && !request.getFile().isEmpty()) {
                String folderName = "rooms/" + request.getUserId(); // 사용자별 폴더 생성
                String fileName = fileStorageService.storeFile(request.getFile(), folderName);
                fileUrl = fileStorageService.getFileUrl(fileName);
            }
            RoomDto roomDto = request.toRoomDto(fileUrl);
            RoomDto createdRoom = roomService.createRoom(roomDto);
            return CommonResponse.created("Room created successfully");
        } catch (IOException e) {
            return CommonResponse.badRequest("Failed to upload thumbnail");
        }
    }

    @GetMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<RoomDto> getRoomByUserId(@PathVariable Long userId) {
        RoomDto room = roomService.getRoomByUserId(userId);
        return CommonResponse.ok("Room retrieved successfully", room);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<List<RoomDto>> getAllRooms() {
        List<RoomDto> rooms = roomService.getAllRooms();
        return CommonResponse.ok("Rooms retrieved successfully", rooms);
    }

    @PutMapping("/{roomId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<RoomDto> updateRoom(@PathVariable Long roomId, @Valid @RequestBody RoomDto roomDto) {
        RoomDto updatedRoom = roomService.updateRoom(roomId, roomDto);
        return CommonResponse.ok("Room updated successfully", updatedRoom);
    }

    @DeleteMapping("/{roomId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<Void> deleteRoom(@PathVariable Long roomId) {
        roomService.deleteRoom(roomId);
        return CommonResponse.ok("Room deleted successfully");
    }


    @GetMapping("/recommend/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<List<RoomDto>> getRecommendedRooms(@PathVariable Long userId) {
        List<RoomDto> recommendedRooms = roomService.getRandomRoomsWithLikeStatus(userId, 3);
        return CommonResponse.ok("Recommended rooms retrieved successfully", recommendedRooms);
    }


    @GetMapping("/recommend")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<List<RoomDto>> getRecommendedRooms() {
        int count = 3;
        List<RoomDto> recommendedRooms = roomService.getRandomRooms(count);
        return CommonResponse.ok("Recommended rooms retrieved successfully", recommendedRooms);
    }
}
