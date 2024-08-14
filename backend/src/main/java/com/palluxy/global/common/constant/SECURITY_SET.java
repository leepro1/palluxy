package com.palluxy.global.common.constant;

public final class SECURITY_SET {

    public static final String[] PERMITALL_URL_PATTERNS = {

        // swagger
        "/v3/api-docs/**",
        "/swagger-ui/**",
        "/swagger-ui/index.html",

        // auth
        "/api/login",
        "/api/logout",

        // refresh
        "/api/reissue",

        // guestBook
        "/api/guestbook/*",
        "/api/guestbook/*/comments",

        // room
        "/api/rooms",
        "/api/rooms/user/*",
        "/api/rooms/recommend",

        // album
        "/api/albums/*",
        "/api/albums/room/*",

        // image
        "/api/albums/*/images/*",
        "/api/albums/*/images",

        // pet
        "/api/pets/personalities",

        // user
        "/api/users",
        "/api/users/reset-password",
        "/api/users/check-nickname/*",
        "/api/users/check-email/*",

        // email
        "/api/email/verify",
        "/api/email/code",

        // group
        "/api/group/*/*",
        "/api/group/detail/*",
        "/api/group/search",
        "/api/group/available/*"
    };

    public static final String[] NEED_LOGIN_URL_PATTERNS = {

        // guestBook
        "/api/guestbook/*/user/*",
        "/api/guestbook/comment/*/user/*",
        "/api/guestbook/*/comment/user/*",
        "/api/guestbook/room/*/user/*",
        "/api/guestbook/comment/*/report/user/*",

        // room
        "/api/rooms/*",

        // album
        "/api/albums/*",

        // image
        "/api/albums/*/images/*",
        "/api/albums/*/images/*/url",
        "/api/albums/*/images/*/index",
        "/api/albums/*/images/*/angle",

        // like
        "/api/likes/room/*/user/*",
        "/api/likes/user/*",

        // pet
        "/api/pets/*",
        "/api/pets",
        "/api/pets/users/*",

        // webRTC
        "/api/sessions",
        "/api/sessions/*/connections",
        "/api/sessions/*",
        "/api/sessions/*/connection/*",

        // group
        "/api/group",
        "/api/group/detail/*/join",
        "/api/group/my/*/*",
        "/api/group/my/all/*/*",

        // letter
        "/api/letter/*",
        "/api/letter/room/*"
    };

    public static final String[] NEED_ADMIN_ROLE_URL_PATTERNS = {
        "/api/admin/**",
        "/api/admin/group/accept",

        // user
        "/api/users/nickname/*",
        "/api/users/email/*",
        "/api/users"
    };

    private SECURITY_SET() {
    }
}
