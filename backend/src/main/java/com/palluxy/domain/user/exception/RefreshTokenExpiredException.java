package com.palluxy.domain.user.exception;

public class RefreshTokenExpiredException extends RuntimeException {

    public RefreshTokenExpiredException(String msg) {
        super(msg);
    }
}