package com.palluxy.domain.user.exception;

public class DuplicateUserException extends RuntimeException {

    public DuplicateUserException(String msg) {
        super(msg);
    }
}
