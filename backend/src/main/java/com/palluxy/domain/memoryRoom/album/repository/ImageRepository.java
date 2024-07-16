package com.palluxy.domain.memoryRoom.album.repository;

import com.palluxy.domain.memoryRoom.album.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
}
