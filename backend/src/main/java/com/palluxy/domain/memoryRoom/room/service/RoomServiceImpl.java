package com.palluxy.domain.memoryRoom.room.service;

import com.palluxy.domain.memoryRoom.room.dto.RoomDto;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {

  @Autowired
  private RoomRepository roomRepository;

  @Override
  public RoomDto createRoom(RoomDto roomDto) {
    Room room = new Room();
    room.setName(roomDto.getName());
    room.setDescription(roomDto.getDescription());
    room = roomRepository.save(room);
    return new RoomDto(room);
  }

  @Override
  public RoomDto getRoomById(Long id) {
    Room room = roomRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    return new RoomDto(room);
  }

  @Override
  public List<RoomDto> getAllRooms() {
    List<Room> rooms = roomRepository.findAll();
    return rooms.stream().map(RoomDto::new).collect(Collectors.toList());
  }

  @Override
  public RoomDto updateRoom(Long id, RoomDto roomDto) {
    Room room = roomRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    room.setName(roomDto.getName());
    room.setDescription(roomDto.getDescription());
    room = roomRepository.save(room);
    return new RoomDto(room);
  }

  @Override
  public void deleteRoom(Long id) {
    roomRepository.deleteById(id);
  }
}
