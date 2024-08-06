package com.palluxy.domain.memoryRoom.room.service;

import com.palluxy.domain.memoryRoom.album.dto.AlbumDto;
import com.palluxy.domain.memoryRoom.album.service.AlbumService;
import com.palluxy.domain.memoryRoom.guestbook.dto.GuestbookDto;
import com.palluxy.domain.memoryRoom.guestbook.service.GuestbookService;
import com.palluxy.domain.memoryRoom.like.repository.LikeRepository;
import com.palluxy.domain.memoryRoom.room.dto.RoomDto;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import com.palluxy.domain.user.entity.User;
import com.palluxy.domain.user.repository.UserRepository;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Room 서비스 구현체
 */
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

  @Autowired
  private LikeRepository likeRepository;


  @Override
  @Transactional
  public RoomDto createRoom(RoomDto roomDto) {
    // 해당 사용자가 이미 Room을 가지고 있는지 확인
    boolean roomExists = roomRepository.findByUserId(roomDto.getUserId()).isPresent();
    if (roomExists) {
      throw new IllegalStateException("Room already exists for this user");
    }

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

  @Override
  public void updateThumbnailUrl(Long roomId, String thumbnailUrl) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    room.setThumbnailUrl(thumbnailUrl);
    roomRepository.save(room);
  }


  @Override
  public List<RoomDto> getRandomRoomsWithLikeStatus(Long userId, int count) {
    List<Room> allRooms = roomRepository.findAll();

    // 내 방 제외하기
    allRooms = allRooms.stream()
        .filter(room -> !room.getUser().getId().equals(userId))
        .collect(Collectors.toList());

    Collections.shuffle(allRooms);

    return allRooms.stream()
        .limit(count)
        .map(room -> {
          RoomDto roomDto = new RoomDto(room);
          // 특정 유저가 해당 방을 좋아요 했는지 여부를 DTO에 설정
          roomDto.setLiked(likeRepository.findByRoom_RoomIdAndUser_Id(room.getRoomId(), userId).isPresent());
          return roomDto;
        })
        .collect(Collectors.toList());
  }
}
