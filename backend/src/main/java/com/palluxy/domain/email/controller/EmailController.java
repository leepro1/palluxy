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

    @PostMapping("/code")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> sendCode(@Valid @RequestBody EmailRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new SignupFormatException();
        }

        String code;
        if (request.type().equals("signup")) {
            code = emailService.generateVerificationCodeForSignup(request.email());
        } else if (request.type().equals("password")) {
            code = emailService.generateResetPasswordToken(request.email());
        } else {
            throw new IllegalArgumentException("Invalid request type");
        }

        emailService.sendVerificationCode(request.type(), request.email(), code);
        return CommonResponse.ok("이메일 전송 성공");
    }

    @PostMapping("/verify")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> verifyCode(@Valid @RequestBody EmailVerifyRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new SignupFormatException();
        }

        emailService.verifyCode(request.email(), request.verifyCode());
        return CommonResponse.ok("이메일 인증 성공");
    }
}
