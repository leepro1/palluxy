package com.palluxy.domain.memoryRoom.album.repository;

import com.palluxy.domain.memoryRoom.album.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
  List<Image> findByAlbum_AlbumId(Long albumId);
}

