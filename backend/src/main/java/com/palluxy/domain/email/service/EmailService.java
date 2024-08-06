package com.palluxy.domain.email.service;

public interface EmailService {

    void sendVerificationCode(String type, String to, String code, String additionalInfo);

    void verifyCode(String email, String code);

    String generateVerificationCodeForSignup(String email);

    String generateResetPasswordToken(String email);
}
