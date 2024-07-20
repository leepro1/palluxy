package com.palluxy.domain.memoryRoom.petmeta.repository;

import com.palluxy.domain.memoryRoom.petmeta.entity.PetMeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetMetaRepository extends JpaRepository<PetMeta, Long> {
  List<PetMeta> findByRoom_RoomId(Long roomId);
}
