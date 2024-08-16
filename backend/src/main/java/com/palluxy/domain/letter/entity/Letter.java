package com.palluxy.domain.letter.entity;

import com.palluxy.domain.letter.dto.LetterRequest;
import com.palluxy.domain.letter.dto.Writer;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.global.common.data.BaseEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(indexes = @Index(name = "idx_letter_room_id_and_opened_at", columnList = "room_id, opened_at"))
public class Letter extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    private Writer writer;

    private LocalDateTime openedAt;

    private Long petId;

    @ManyToOne(fetch = FetchType.LAZY)
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
            .title(request.title())
            .content(request.content())
            .writer(Writer.USER)
            .openedAt(LocalDateTime.now())
            .room(room)
            .build();
    }
}
