package com.palluxy.global.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.http.HttpStatus;

public record CommonResponse<T>(

        int statusCode,
        String message,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        T result
) {
    public static <T> CommonResponse<T> ok(String message) {
        return new CommonResponse<>(HttpStatus.OK.value(), message, null);
    }

    public static <T> CommonResponse<T> ok(String message, T result) {
        return new CommonResponse<>(HttpStatus.OK.value(), message, result);
    }

    public static <T> CommonResponse<T> badRequest(String message) {
        return new CommonResponse<>(HttpStatus.BAD_REQUEST.value(), message, null);
    }

    public static <T> CommonResponse<T> badRequest(String message, T result) {
        return new CommonResponse<>(HttpStatus.BAD_REQUEST.value(), message, result);
    }

    public static <T> CommonResponse<T> created(String message) {
        return new CommonResponse<>(HttpStatus.CREATED.value(), message, null);
    }

    public static <T> CommonResponse<T> unauthorized(String message, T result) {
        return new CommonResponse<>(HttpStatus.UNAUTHORIZED.value(), message, null);
    }

    public static <T> CommonResponse<T> forbidden(String message, T result) {
        return new CommonResponse<>(HttpStatus.FORBIDDEN.value(), message, null);
    }

}
