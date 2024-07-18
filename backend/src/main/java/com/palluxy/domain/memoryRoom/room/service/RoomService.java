package com.palluxy.domain.memoryRoom.room.service;

import com.palluxy.domain.memoryRoom.room.dto.RoomDto;

import java.util.List;

public interface RoomService {
    RoomDto createRoom(RoomDto roomDto);
    RoomDto getRoomByUserId(Long userId);
    List<RoomDto> getAllRooms();
    RoomDto updateRoom(Long roomId, RoomDto roomDto);
    void deleteRoom(Long roomId);
}
