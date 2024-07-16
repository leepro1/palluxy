package com.palluxy.domain.memoryRoom.room.controller;

import com.palluxy.domain.memoryRoom.room.dto.RoomDto;
import com.palluxy.domain.memoryRoom.room.service.RoomService;
import com.palluxy.global.common.CommonResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<RoomDto> createRoom(@Valid @RequestBody RoomDto roomDto, @PathVariable Long userId) {
        RoomDto createdRoom = roomService.createRoom(roomDto, userId);
        return CommonResponse.created("Room created successfully");
    }

    @GetMapping("/{roomId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<RoomDto> getRoom(@PathVariable Long roomId) {
        RoomDto room = roomService.getRoomById(roomId);
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
}
