package com.palluxy.domain.email.exception;

public class EmailBadMessagingException extends RuntimeException {
    public EmailBadMessagingException() {
        super("이메일 전송 오류입니다.");
    }
}
