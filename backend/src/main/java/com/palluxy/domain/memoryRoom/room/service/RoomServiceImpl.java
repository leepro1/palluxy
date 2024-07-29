package com.palluxy.domain.memoryRoom.room.service;

import com.palluxy.domain.memoryRoom.album.dto.AlbumDto;
import com.palluxy.domain.memoryRoom.album.service.AlbumService;
import com.palluxy.domain.memoryRoom.guestbook.dto.GuestbookDto;
import com.palluxy.domain.memoryRoom.guestbook.service.GuestbookService;
import com.palluxy.domain.memoryRoom.room.dto.RoomDto;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import com.palluxy.domain.user.entity.User;
import com.palluxy.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {

  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AlbumService albumService;

  @Autowired
  private GuestbookService guestbookService;

  @Override
  @Transactional
  public RoomDto createRoom(RoomDto roomDto) {
    User user = userRepository.findById(roomDto.getUserId())
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    Room room = new Room();
    room.setName(roomDto.getName());
    room.setDescription(roomDto.getDescription());
    room.setThumbnailUrl(roomDto.getThumbnailUrl());
    room.setBackgroundMusic(roomDto.getBackgroundMusic());
    room.setType(roomDto.getType());
    room.setUser(user);

    Room savedRoom = roomRepository.save(room);

    // 앨범 생성
    AlbumDto albumDto = new AlbumDto();
    albumDto.setRoomId(savedRoom.getRoomId());
    albumService.createAlbum(albumDto);

    // 방명록 생성
    GuestbookDto guestbookDto = new GuestbookDto();
    guestbookDto.setRoomId(savedRoom.getRoomId());
    guestbookDto.setOwnerId(user.getId());
    guestbookService.createGuestbook(guestbookDto, savedRoom.getRoomId(), user.getId());

    return new RoomDto(savedRoom);
  }

  @Override
  public RoomDto getRoomByUserId(Long userId) {
    Room room = roomRepository.findByUserId(userId)
        .orElseThrow(() -> new IllegalArgumentException("Room not found for user"));
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

    Room updatedRoom = roomRepository.save(room);
    return new RoomDto(updatedRoom);
  }

  @Override
  public void deleteRoom(Long roomId) {
    roomRepository.deleteById(roomId);
  }
}
