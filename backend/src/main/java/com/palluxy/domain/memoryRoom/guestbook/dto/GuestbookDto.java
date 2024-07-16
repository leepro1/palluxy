package com.palluxy.domain.memoryRoom.guestbook.dto;

import com.palluxy.domain.memoryRoom.guestbook.entity.Guestbook;
import lombok.Data;

@Data
public class GuestbookDto {

    private Long id;
    private Long roomId;
    private Long userId;
    private String content;

    public GuestbookDto() {}

    public GuestbookDto(Guestbook guestbook) {
        this.id = guestbook.getId();
        this.roomId = guestbook.getRoom().getId();
        this.userId = guestbook.getUser().getId();
        this.content = guestbook.getContent();
    }
}
