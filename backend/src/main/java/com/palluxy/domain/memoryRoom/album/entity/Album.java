package com.palluxy.domain.memoryRoom.album.entity;

import com.palluxy.domain.memoryRoom.room.entity.Room;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long albumId;
//    파일 검증을 위해 잠시 주석처리
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "room_id")
//    private Room room;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>(); // 필드 초기화
}
