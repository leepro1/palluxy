package com.palluxy.domain.user.exception;

public class DuplicateUserException extends RuntimeException {
    public DuplicateUserException() {
        super("이미 가입된 이메일입니다.");
    }
}
