package com.palluxy.global.common.constant;

public final class SECURITY_SET {

    public static final String[] PERMITALL_URL_PATTERNS = {

        // swagger
        "/v3/api-docs/**",
        "/swagger-ui/**",
        "/swagger-ui/index.html",

        // join
        "/login",

        // refresh
        "/api/reissue",

        // guestBook
        "/api/guestbook/*",
        "/api/guestbook/*/comments",

        // room
        "/api/rooms",

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
        "/api/rooms/user/*",

        // album
        "/api/albums/*",
        "/api/albums/room/*",

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

        // letter
        "/api/letter/*"
    };

    public static final String[] NEED_ADMIN_ROLE_URL_PATTERNS = {
        "/api/admin/**",
        "/api/admin/group/accept"
    };

    private SECURITY_SET() {
    }
}
