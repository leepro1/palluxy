package com.palluxy.global.error;

import com.palluxy.domain.group.exception.NotFoundException;
import com.palluxy.domain.group.exception.OpenviduException;
import com.palluxy.domain.group.exception.ValidateException;
import com.palluxy.domain.user.exception.DuplicateUserException;
import com.palluxy.global.common.CommonResponse;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CommonExceptionHandler {

    @ExceptionHandler({
            DuplicateUserException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CommonResponse<?> handleDuplicateUserException(Exception e) {return CommonResponse.badRequest(e.getMessage());}

    @ExceptionHandler({
            NotFoundException.class,
            ValidateException.class,
            OpenviduException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CommonResponse<?> handleNotFoundException(Exception e) {return CommonResponse.badRequest(e.getMessage());}

}
