package com.palluxy.domain.email.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public record EmailRequest(

        @NotEmpty(message = "이메일을 입력해 주세요")
        @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "이메일 형식으로 작성해주세요.")
        String email
) {
}
