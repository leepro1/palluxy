package com.palluxy.domain.user.exception;

public class BadResetPasswordCodeUserException extends RuntimeException {

    public BadResetPasswordCodeUserException(String msg) {
        super(msg);
    }
}
