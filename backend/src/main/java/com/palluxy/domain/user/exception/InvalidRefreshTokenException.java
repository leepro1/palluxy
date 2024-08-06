package com.palluxy.domain.user.exception;

public class InvalidRefreshTokenException extends RuntimeException {

    public InvalidRefreshTokenException(String msg) {
        super(msg);
    }
}