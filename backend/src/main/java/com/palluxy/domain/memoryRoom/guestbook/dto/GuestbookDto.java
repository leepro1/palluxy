package com.palluxy.domain.memoryRoom.guestbook.dto;

import com.palluxy.domain.memoryRoom.guestbook.entity.Guestbook;
import lombok.Data;

@Data
public class GuestbookDto {

    private Long guestbookId;
    private Long roomId;
    private Long userId;
    private String content;
    private boolean isDeleted;

    public GuestbookDto() {}

    public GuestbookDto(Guestbook guestbook) {
        this.guestbookId = guestbook.getGuestbookId();
        this.roomId = guestbook.getRoom().getRoomId();
        this.userId = guestbook.getUser().getId();
        this.content = guestbook.getContent();
        this.isDeleted = guestbook.isDeleted();
    }
}
