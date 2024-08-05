package com.palluxy.domain.letter.entity;

import com.palluxy.domain.letter.dto.LetterRequest;
import com.palluxy.domain.letter.dto.Writer;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(indexes = @Index(name = "idx_letter_room_id_and_opened_at", columnList = "room_id, opened_at"))
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

  @ManyToOne
  @JoinColumn(name = "room_id")
  private Room room;

  @Builder
  public Letter(String title, String content, Writer writer, Long petId, LocalDateTime openedAt,
      Room room) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.petId = petId;
    this.openedAt = openedAt;
    this.room = room;
  }

  public static Letter of(LetterRequest request, Long petId, Room room) {
    return Letter.builder()
        .petId(petId)
        .title(request.getTitle())
        .content(request.getContent())
        .writer(Writer.USER)
        .openedAt(LocalDateTime.now())
        .room(room)
        .build();
  }
}
