package com.palluxy.domain.memoryRoom.album.repository;

import com.palluxy.domain.memoryRoom.album.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
  Album findByRoomRoomId(Long roomId);  // 수정된 부분
}
