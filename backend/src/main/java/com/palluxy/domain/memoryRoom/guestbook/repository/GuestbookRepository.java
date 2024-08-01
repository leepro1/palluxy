package com.palluxy.domain.memoryRoom.guestbook.repository;

import com.palluxy.domain.memoryRoom.guestbook.entity.Guestbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GuestbookRepository extends JpaRepository<Guestbook, Long> {
  Optional<Guestbook> findByRoom_RoomId(Long roomId);  // Room ID로 Guestbook 찾기
}
