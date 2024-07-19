package com.palluxy.domain.memoryRoom.guestbook.service;

import com.palluxy.domain.memoryRoom.guestbook.dto.CommentDto;
import com.palluxy.domain.memoryRoom.guestbook.dto.GuestbookDto;
import com.palluxy.domain.memoryRoom.guestbook.entity.Comment;
import com.palluxy.domain.memoryRoom.guestbook.entity.Guestbook;
import com.palluxy.domain.memoryRoom.guestbook.repository.CommentRepository;
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
  private CommentRepository commentRepository;

  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private UserRepository userRepository;

  @Override
  public GuestbookDto createGuestbook(GuestbookDto guestbookDto, Long roomId, Long userId) {
    Room room = roomRepository.findById(roomId)
        .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    User owner = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    Guestbook guestbook = new Guestbook();
    guestbook.setRoom(room);
    guestbook.setOwner(owner);

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
  public GuestbookDto updateGuestbook(Long guestbookId, Long userId, GuestbookDto guestbookDto) {
    Guestbook guestbook = guestbookRepository.findById(guestbookId)
        .orElseThrow(() -> new IllegalArgumentException("Guestbook entry not found"));

    if (!guestbook.getOwner().getId().equals(userId)) {
      throw new IllegalArgumentException("Only the room owner can update the guestbook entry");
    }

    guestbook = guestbookRepository.save(guestbook);
    return new GuestbookDto(guestbook);
  }

  @Override
  public void addComment(Long guestbookId, Long userId, String content) {
    Guestbook guestbook = guestbookRepository.findById(guestbookId)
        .orElseThrow(() -> new IllegalArgumentException("Guestbook entry not found"));
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    Comment comment = new Comment();
    comment.setGuestbook(guestbook);
    comment.setUser(user);
    comment.setContent(content);

    commentRepository.save(comment);
  }

  @Override
  public void updateComment(Long commentId, Long userId, String content) {
    Comment comment = commentRepository.findById(commentId)
        .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

    if (!comment.getUser().getId().equals(userId)) {
      throw new IllegalArgumentException("Only the comment creator can update the comment");
    }

    comment.setContent(content);
    commentRepository.save(comment);
  }

  @Override
  public void deleteComment(Long commentId, Long userId) {
    Comment comment = commentRepository.findById(commentId)
        .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

    if (!comment.getUser().getId().equals(userId) && !comment.getGuestbook().getOwner().getId().equals(userId)) {
      throw new IllegalArgumentException("Only the comment creator or the guestbook owner can delete the comment");
    }

    comment.setDeleted(true);
    commentRepository.save(comment);
  }

  @Override
  public void reportComment(Long commentId, Long reporterId) {
    Comment comment = commentRepository.findById(commentId)
        .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

    comment.setReportCount(comment.getReportCount() + 1);
    commentRepository.save(comment);
  }

  @Override
  public List<CommentDto> getAllCommentsByGuestbookId(Long guestbookId) {
    Guestbook guestbook = guestbookRepository.findById(guestbookId)
        .orElseThrow(() -> new IllegalArgumentException("Guestbook entry not found"));

    return guestbook.getComments().stream()
        .filter(comment -> !comment.isDeleted())
        .map(CommentDto::new)
        .collect(Collectors.toList());
  }
}
