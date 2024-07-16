package com.palluxy.domain.room.controller;

import com.palluxy.domain.room.dto.RoomDto;
import com.palluxy.domain.room.service.RoomService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public RoomDto createRoom(@RequestBody RoomDto roomDto) {
        return roomService.createRoom(roomDto);
    }

    @GetMapping("/{id}")
    public RoomDto getRoom(@PathVariable Long id) {
        return roomService.getRoomById(id);
    }

    @GetMapping
    public List<RoomDto> getAllRooms() {
        return roomService.getAllRooms();
    }

    @PutMapping("/{id}")
    public RoomDto updateRoom(@PathVariable Long id, @RequestBody RoomDto roomDto) {
        return roomService.updateRoom(id, roomDto);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }
}
