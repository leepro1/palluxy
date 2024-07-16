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
  public GuestbookDto createGuestbookEntry(Long roomId, Long userId, GuestbookDto guestbookDto) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    Guestbook guestbook = new Guestbook();
    guestbook.setRoom(room);
    guestbook.setUser(user);
    guestbook.setContent(guestbookDto.getContent());

    guestbook = guestbookRepository.save(guestbook);
    return new GuestbookDto(guestbook);
  }

  @Override
  public GuestbookDto getGuestbookEntryById(Long guestbookId) {
    Guestbook guestbook = guestbookRepository.findById(guestbookId)
        .orElseThrow(() -> new IllegalArgumentException("Guestbook not found"));
    return new GuestbookDto(guestbook);
  }

  @Override
  public List<GuestbookDto> getAllGuestbookEntriesByRoomId(Long roomId) {
    List<Guestbook> guestbooks = guestbookRepository.findByRoomId(roomId);
    return guestbooks.stream().map(GuestbookDto::new).collect(Collectors.toList());
  }

  @Override
  public GuestbookDto updateGuestbookEntry(Long guestbookId, Long userId, GuestbookDto guestbookDto) {
    Guestbook guestbook = guestbookRepository.findById(guestbookId)
        .orElseThrow(() -> new IllegalArgumentException("Guestbook not found"));
    if (!guestbook.getUser().getId().equals(userId)) {
      throw new IllegalStateException("You can only update your own guestbook entries");
    }
    guestbook.setContent(guestbookDto.getContent());
    guestbook = guestbookRepository.save(guestbook);
    return new GuestbookDto(guestbook);
  }

  @Override
  public void deleteGuestbookEntry(Long guestbookId, Long userId) {
    Guestbook guestbook = guestbookRepository.findById(guestbookId)
        .orElseThrow(() -> new IllegalArgumentException("Guestbook not found"));
    if (!guestbook.getUser().getId().equals(userId) && !guestbook.getRoom().getOwner().getId().equals(userId)) {
      throw new IllegalStateException("You can only delete your own guestbook entries or if you are the room owner");
    }
    guestbookRepository.deleteById(guestbookId);
  }
}
