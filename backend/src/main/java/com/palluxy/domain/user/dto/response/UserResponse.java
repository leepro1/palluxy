package com.palluxy.domain.user.dto.response;

import com.palluxy.domain.user.entity.User;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UserResponse(

        Long id,
        String email,
        String nickname,
        boolean isAdmin,
        boolean isBanned,
        boolean acceptedTerms,
        LocalDateTime acceptedTermsAt
) {
    public static UserResponse of(User data) {
        return UserResponse.builder()
                .id(data.getId())
                .email(data.getEmail())
                .nickname(data.getNickname())
                .isAdmin(data.isAdmin())
                .isBanned(data.isBanned())
                .acceptedTerms(data.isAcceptedTerms())
                .acceptedTermsAt(data.getAcceptedTermsAt())
                .build();
    }
}
