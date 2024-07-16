package com.palluxy.domain.memoryRoom.room.controller;

import com.palluxy.domain.memoryRoom.room.dto.RoomDto;
import com.palluxy.domain.memoryRoom.room.service.RoomService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/{userId}")
    public RoomDto createRoom(@RequestBody RoomDto roomDto, @PathVariable long userId) {
        return roomService.createRoom(roomDto, userId);
    }

    @GetMapping("/{roomId}")
    public RoomDto getRoom(@PathVariable Long roomId) {
        return roomService.getRoomById(roomId);
    }

    @GetMapping
    public List<RoomDto> getAllRooms() {
        return roomService.getAllRooms();
    }

    @PutMapping("/{roomId}")
    public RoomDto updateRoom(@PathVariable Long roomId, @RequestBody RoomDto roomDto) {
        return roomService.updateRoom(roomId, roomDto);
    }

    @DeleteMapping("/{roomId}")
    public void deleteRoom(@PathVariable Long roomId) {
        roomService.deleteRoom(roomId);
    }
}
