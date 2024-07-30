package com.palluxy.global.common.error;

import com.palluxy.domain.group.exception.NotFoundException;
import com.palluxy.domain.group.exception.OpenviduException;
import com.palluxy.domain.group.exception.ValidateException;
import com.palluxy.domain.user.exception.DuplicateUserException;
import com.palluxy.domain.user.exception.InvalidRefreshTokenException;
import com.palluxy.domain.user.exception.RefreshTokenExpiredException;
import com.palluxy.domain.user.exception.RefreshTokenNullException;
import com.palluxy.global.common.data.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CommonExceptionHandler {

    @ExceptionHandler({
        NotFoundException.class,
        ValidateException.class,
        OpenviduException.class,
        RefreshTokenNullException.class,
        RefreshTokenExpiredException.class,
        InvalidRefreshTokenException.class,
        DuplicateUserException.class,
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CommonResponse<?> handleCommonExceptions(Exception e) {
        return CommonResponse.badRequest(e.getMessage());
    }

}
