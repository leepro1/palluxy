package com.palluxy.domain.letter.service;

import com.palluxy.domain.letter.entity.Letter;
import com.palluxy.domain.letter.repository.LetterRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LetterService {

  private final LetterRepository letterRepository;

  public void saveLetter(Letter letter) {
    letterRepository.saveAndFlush(letter);
  }

  public List<Letter> findByOpenedAtBefore() {
    return letterRepository.findByOpenedAtBefore(LocalDateTime.now());
  }
}
