package com.palluxy.domain.memoryRoom.guestbook.repository;

import com.palluxy.domain.memoryRoom.guestbook.entity.Guestbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestbookRepository extends JpaRepository<Guestbook, Long> {
  List<Guestbook> findByRoomId(Long roomId);
}
