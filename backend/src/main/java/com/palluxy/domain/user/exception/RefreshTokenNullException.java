package com.palluxy.domain.user.exception;

public class RefreshTokenNullException extends RuntimeException {

    public RefreshTokenNullException(String msg) {
        super(msg);
    }
}