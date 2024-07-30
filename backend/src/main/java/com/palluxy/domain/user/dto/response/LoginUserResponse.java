package com.palluxy.domain.user.dto.response;

import com.palluxy.domain.user.dto.CustomUserDetails;
import lombok.Builder;

@Builder
public record LoginUserResponse(

    Long id,
    String nickname
) {

    public static LoginUserResponse of(CustomUserDetails data) {
        return LoginUserResponse.builder()
            .id(data.getUserId())
            .nickname(data.getUsername())
            .build();
    }
}
