package com.palluxy.domain.memoryRoom.room.repository;

import com.palluxy.domain.memoryRoom.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
}
