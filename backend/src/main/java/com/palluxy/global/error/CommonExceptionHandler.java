package com.palluxy.global.error;

import com.palluxy.domain.group.exception.NotFoundException;
import com.palluxy.domain.group.exception.ValidateException;
import com.palluxy.domain.user.exception.DuplicateUserException;
import com.palluxy.global.common.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class CommonExceptionHandler {

    @ExceptionHandler({
            DuplicateUserException.class,
            RuntimeException.class,
            NotFoundException.class,
            ValidateException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CommonResponse<?> handleDuplicateUserException(String msg) {
        return CommonResponse.badRequest(msg);
    }
    public CommonResponse<?> handleNotFoundException(String msg) {
        return CommonResponse.badRequest(msg);
    }
    public CommonResponse<?> handleValidateException(String msg) {
        return CommonResponse.badRequest(msg);
    }

}
