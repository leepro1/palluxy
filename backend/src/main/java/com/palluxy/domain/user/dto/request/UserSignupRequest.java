package com.palluxy.domain.user.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public record UserSignupRequest(

        @NotEmpty
        @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "이메일 형식으로 작성해주세요.")
        String email,

        @NotEmpty
        String nickname,

        @NotEmpty
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{9,16}$",
                message = "비밀번호는 영문/숫자/특수문자 최소 1개씩 포함, 9~16자로 설정해주세요. (특수문자 일부 제외)")
        String password,

        boolean acceptedTerms
) {
}