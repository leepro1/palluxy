package com.palluxy.domain.memoryRoom.guestbook.dto;

import com.palluxy.domain.memoryRoom.guestbook.entity.Guestbook;
import com.palluxy.domain.user.entity.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class GuestbookDto {

    private Long guestbookId;
    private Long roomId;
    private Long ownerId;  // 방명록 소유자 ID
    private List<CommentDto> comments;

    public GuestbookDto() {}

    public GuestbookDto(Guestbook guestbook) {
        this.guestbookId = guestbook.getGuestbookId();
        this.roomId = guestbook.getRoom().getRoomId();
        this.ownerId = guestbook.getOwner().getId();
        this.comments = guestbook.getComments() != null ?
            guestbook.getComments().stream()
                .map(comment -> new CommentDto(comment, comment.getUser().getNickname())) // 닉네임 추가
                .collect(Collectors.toList())
            : new ArrayList<>();
    }
}
