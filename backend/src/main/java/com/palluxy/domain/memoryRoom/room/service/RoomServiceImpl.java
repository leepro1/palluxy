package com.palluxy.domain.memoryRoom.room.service;

import com.palluxy.domain.memoryRoom.room.dto.RoomDto;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import com.palluxy.domain.user.entity.User;
import com.palluxy.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {

  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private UserRepository userRepository;

  @Override
  public RoomDto createRoom(RoomDto roomDto, Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));
    Room room = new Room();
    room.setName(roomDto.getName());
    room.setDescription(roomDto.getDescription());
    room.setThumbnailUrl(roomDto.getThumbnailUrl());
    room.setBackgroundMusic(roomDto.getBackgroundMusic());
    room.setType(roomDto.getType());
    room.setUser(user);
    room = roomRepository.save(room);
    return new RoomDto(room);
  }

  @Override
  public RoomDto getRoomById(Long roomId) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    return new RoomDto(room);
  }

  @Override
  public List<RoomDto> getAllRooms() {
    List<Room> rooms = roomRepository.findAll();
    return rooms.stream().map(RoomDto::new).collect(Collectors.toList());
  }

  @Override
  public RoomDto updateRoom(Long roomId, RoomDto roomDto) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    room.setName(roomDto.getName());
    room.setDescription(roomDto.getDescription());
    room.setThumbnailUrl(roomDto.getThumbnailUrl());
    room.setBackgroundMusic(roomDto.getBackgroundMusic());
    room.setType(roomDto.getType());
    room = roomRepository.save(room);
    return new RoomDto(room);
  }

  @Override
  public void deleteRoom(Long roomId) {
    roomRepository.deleteById(roomId);
  }
}
