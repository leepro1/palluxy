package com.palluxy.domain.memoryRoom.room.repository;

import com.palluxy.domain.memoryRoom.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
  Optional<Room> findByUserId(Long userId);
}
