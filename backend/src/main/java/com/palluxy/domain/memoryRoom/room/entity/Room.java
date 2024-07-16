package com.palluxy.domain.memoryRoom.room.entity;

import com.palluxy.domain.memoryRoom.album.entity.Album;
import com.palluxy.domain.user.entity.User; // Ensure this import exists
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private String name;
    private String description;
    private String thumbnailUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int backgroundMusic;
    private int type;

    @OneToOne(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private Album album;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
