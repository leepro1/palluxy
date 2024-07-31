package com.palluxy.global.common.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtil {

    public static Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }

    public static void addSameSiteCookieAttribute(HttpServletResponse response, Cookie cookie) {
        StringBuilder cookieString = new StringBuilder();
        cookieString.append(cookie.getName()).append("=").append(cookie.getValue()).append(";");
        cookieString.append(" Max-Age=").append(cookie.getMaxAge()).append(";");
        cookieString.append(" Path=").append(cookie.getPath()).append(";");
        cookieString.append(" HttpOnly;");
        if (cookie.getSecure()) {
            cookieString.append(" Secure;");
        }
        cookieString.append(" SameSite=None;");

        response.addHeader("Set-Cookie", cookieString.toString());
    }
}
