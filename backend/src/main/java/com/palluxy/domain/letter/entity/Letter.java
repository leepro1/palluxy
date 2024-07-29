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
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

  @Builder
  public Letter(String title, String content, Writer writer, Long petId, LocalDateTime openedAt) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.petId = petId;
    this.openedAt = openedAt;
  }

  public static Letter of(LetterRequest request, Long petId) {
    return Letter.builder()
        .petId(petId)
        .title(request.getTitle())
        .content(request.getContent())
        .writer(Writer.USER)
        .openedAt(LocalDateTime.now())
        .build();
  }
}

