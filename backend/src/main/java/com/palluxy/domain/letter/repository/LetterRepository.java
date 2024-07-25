package com.palluxy.domain.letter.repository;

import com.palluxy.domain.letter.entity.Letter;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Long> {
  List<Letter> findByPetIdAndOpenedAtBefore(Long petId, LocalDateTime now);
  List<Letter> findByPetId(Long petId);
}
