package com.palluxy.domain.email.controller;

import com.palluxy.domain.email.dto.EmailRequest;
import com.palluxy.domain.email.dto.EmailVerifyRequest;
import com.palluxy.domain.email.service.EmailService;
import com.palluxy.domain.user.exception.SignupFormatException;
import com.palluxy.global.common.CommonResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> sendCode(@Valid @RequestBody EmailRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new SignupFormatException();
        }
        emailService.sendVerificationCode("signup", request.email());
        return CommonResponse.ok("이메일 전송 성공");
    }

    @PostMapping("/verify")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> verifyCode(@RequestBody EmailVerifyRequest request) {
        emailService.verifyCode(request.email(), request.verifyCode());
        return CommonResponse.ok("이메일 인증 성공");
    }
}
