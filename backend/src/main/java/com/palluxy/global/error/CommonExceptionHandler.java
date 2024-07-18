package com.palluxy.global.error;

import com.palluxy.domain.user.exception.DuplicateUserException;
import com.palluxy.global.common.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CommonExceptionHandler {

    @ExceptionHandler({
        DuplicateUserException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CommonResponse<?> handleDuplicateUserException(DuplicateUserException ex) {
        return CommonResponse.badRequest(ex.getMessage());
    }
}