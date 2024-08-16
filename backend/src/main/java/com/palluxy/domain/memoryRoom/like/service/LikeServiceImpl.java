package com.palluxy.domain.memoryRoom.like.service;

import com.palluxy.domain.memoryRoom.like.dto.LikeDto;
import com.palluxy.domain.memoryRoom.like.entity.Like;
import com.palluxy.domain.memoryRoom.like.repository.LikeRepository;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import com.palluxy.domain.user.entity.User;
import com.palluxy.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikeServiceImpl implements LikeService {

  @Autowired
  private LikeRepository likeRepository;

  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private UserRepository userRepository;

  @Override
  public LikeDto addLike(Long roomId, Long userId) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    if (likeRepository.findByRoom_RoomIdAndUser_Id(roomId, userId).isPresent()) {
      throw new IllegalArgumentException("User has already liked this room");
    }

    Like like = new Like();
    like.setRoom(room);
    like.setUser(user);
    room.setLikeCount(room.getLikeCount() + 1);

    like = likeRepository.save(like);
    roomRepository.save(room);

    return new LikeDto(like);
  }

  @Override
  public void removeLike(Long roomId, Long userId) {
    Like like = likeRepository.findByRoom_RoomIdAndUser_Id(roomId, userId)
        .orElseThrow(() -> new IllegalArgumentException("Like not found"));
    Room room = like.getRoom();
    room.setLikeCount(room.getLikeCount() - 1);

    likeRepository.delete(like);
    roomRepository.save(room);
  }

  @Override
  public List<LikeDto> getLikesByUserId(Long userId) {
    List<Like> likes = likeRepository.findByUser_Id(userId);
    return likes.stream().map(LikeDto::new).collect(Collectors.toList());
  }
}
