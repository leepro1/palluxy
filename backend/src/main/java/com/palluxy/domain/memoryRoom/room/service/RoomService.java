package com.palluxy.domain.memoryRoom.room.service;

import com.palluxy.domain.memoryRoom.room.dto.RoomDto;

import java.util.List;

/**
 * Room 서비스 인터페이스
 */
public interface RoomService {
    RoomDto createRoom(RoomDto roomDto);
    RoomDto getRoomByUserId(Long userId);
    List<RoomDto> getAllRooms();
    RoomDto updateRoom(Long roomId, RoomDto roomDto);
    void deleteRoom(Long roomId);
    void updateThumbnailUrl(Long roomId, String thumbnailUrl);
    List<RoomDto> getRandomRoomsWithLikeStatus(Long userId, int count);
    public List<RoomDto> getRandomRooms(int count);

}
