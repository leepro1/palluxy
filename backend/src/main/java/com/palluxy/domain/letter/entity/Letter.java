package com.palluxy.domain.letter.entity;

import com.palluxy.domain.letter.dto.LetterRequest;
import com.palluxy.domain.letter.dto.Writer;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@ToString
public class Letter {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;
  @Column(columnDefinition = "TEXT")
  private String content;
  @Enumerated(EnumType.STRING)
  private Writer writer;
  @CreationTimestamp
  private LocalDateTime createdAt;
  private LocalDateTime openedAt;

  private Long petId;

  public Letter() {}

  public Letter(Long petId) {
    this.petId = petId;
  }

  public Letter(String title, String content, Writer writer, Long petId) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.petId = petId;
  }

  public void setOpenedAt(LocalDateTime openedAt) {
    this.openedAt = openedAt;
  }

  public Letter of (LetterRequest request) {
    this.title = request.getTitle();
    this.content = request.getContent();
    this.writer = Writer.USER;
    this.openedAt = LocalDateTime.now();

    return this;
  }
}

