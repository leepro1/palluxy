package com.palluxy.domain.user.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("유저가 존재하지 않습니다.");
    }
}