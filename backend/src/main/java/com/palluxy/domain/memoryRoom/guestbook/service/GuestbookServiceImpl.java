package com.palluxy.domain.memoryRoom.guestbook.service;

import com.palluxy.domain.memoryRoom.guestbook.dto.GuestbookDto;
import com.palluxy.domain.memoryRoom.guestbook.entity.Guestbook;
import com.palluxy.domain.memoryRoom.guestbook.repository.GuestbookRepository;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import com.palluxy.domain.user.entity.User;
import com.palluxy.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GuestbookServiceImpl implements GuestbookService {

  @Autowired
  private GuestbookRepository guestbookRepository;

  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private UserRepository userRepository;

  @Override
  public GuestbookDto createGuestbook(GuestbookDto guestbookDto, Long roomId, Long userId) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    Guestbook guestbook = new Guestbook();
    guestbook.setContent(guestbookDto.getContent());
    guestbook.setRoom(room);
    guestbook.setUser(user);

    guestbook = guestbookRepository.save(guestbook);
    return new GuestbookDto(guestbook);
  }

  @Override
  public GuestbookDto getGuestbookById(Long guestbookId) {
    Guestbook guestbook = guestbookRepository.findById(guestbookId)
        .orElseThrow(() -> new IllegalArgumentException("Guestbook entry not found"));
    return new GuestbookDto(guestbook);
  }

  @Override
  public List<GuestbookDto> getAllGuestbooksByRoomId(Long roomId) {
    List<Guestbook> guestbooks = guestbookRepository.findByRoom_RoomId(roomId).stream()
        .filter(guestbook -> !guestbook.isDeleted())
        .collect(Collectors.toList());
    return guestbooks.stream().map(GuestbookDto::new).collect(Collectors.toList());
  }

  @Override
  public GuestbookDto updateGuestbook(Long guestbookId, Long userId, GuestbookDto guestbookDto) {
    Guestbook guestbook = guestbookRepository.findById(guestbookId)
        .orElseThrow(() -> new IllegalArgumentException("Guestbook entry not found"));

    if (!guestbook.getUser().getId().equals(userId)) {
      throw new IllegalArgumentException("Only the creator can update the guestbook entry");
    }

    guestbook.setContent(guestbookDto.getContent());
    guestbook = guestbookRepository.save(guestbook);
    return new GuestbookDto(guestbook);
  }

  @Override
  public void deleteGuestbook(Long guestbookId, Long userId) {
    Guestbook guestbook = guestbookRepository.findById(guestbookId)
        .orElseThrow(() -> new IllegalArgumentException("Guestbook entry not found"));

    // 작성한 유저와 room 주인만 삭제 가능하도록하게
//    if (!guestbook.getUser().getId().equals(userId) && !guestbook.getRoom().getUser().getId().equals(userId)) {
//      throw new IllegalArgumentException("Only the creator or the room owner can delete the guestbook entry");
//    }

    guestbook.setDeleted(true);
    guestbookRepository.save(guestbook);
  }

  @Override
  public void reportGuestbook(Long guestbookId, Long reporterId, String reportContent) {
    // 신고 처리 로직 추가
  }
}
