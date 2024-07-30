package com.palluxy.global.common.constant;

public final class JWT_SET {

    public static final Long ACCESS_TOKEN_EXPIRATION = (long) (1000 * 60 * 2); // 엑세스 토큰 유효시간 : 10분
    public static final Long REFRESH_TOKEN_EXPIRATION = (long) (1000 * 60 * 60 * 24); // 리프레시 토큰 유효시간 : 24시간

    private JWT_SET() {
    }
}