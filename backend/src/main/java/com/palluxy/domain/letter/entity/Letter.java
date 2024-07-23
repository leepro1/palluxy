package com.palluxy.domain.letter.entity;

import com.palluxy.domain.letter.dto.LetterRequest;
import com.palluxy.domain.letter.dto.Writer;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
public class Letter {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;
  private String content;
  private Writer writer;
  @CreationTimestamp
  private LocalDateTime createdAt;
  private LocalDateTime openedAt;

  private Long petId;
  private Long userId;

  public Letter() {}

  public Letter of (LetterRequest request) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.petId = petId;
    this.userId = userId;

    return this;
  }
}

