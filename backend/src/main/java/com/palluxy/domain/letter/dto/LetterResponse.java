package com.palluxy.domain.letter.dto;

import com.palluxy.domain.letter.entity.Letter;
import lombok.Builder;

@Builder
public record LetterResponse(
    Long id,

    String title,

    String content,

    Writer writer

) {

    public static LetterResponse of(Letter letter) {
        return LetterResponse.builder()
            .id(letter.getId())
            .title(letter.getTitle())
            .content(letter.getContent())
            .writer(letter.getWriter())
            .build();
    }

}
