package com.palluxy.domain.memoryRoom.like.repository;

import com.palluxy.domain.memoryRoom.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
  Optional<Like> findByRoomIdAndUserId(Long roomId, Long userId);
  List<Like> findByUserId(Long userId);
}
