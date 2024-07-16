package com.palluxy.domain.room.service;

import com.palluxy.domain.room.dto.RoomDto;
import java.util.List;

public interface RoomService {
    RoomDto createRoom(RoomDto roomDto);
    RoomDto getRoomById(Long id);
    List<RoomDto> getAllRooms();
    RoomDto updateRoom(Long id, RoomDto roomDto);
    void deleteRoom(Long id);
}
