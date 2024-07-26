package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.entity.Refresh;
import com.palluxy.domain.user.exception.RefreshTokenNullException;
import com.palluxy.domain.user.exception.RefreshTokenExpiredException;
import com.palluxy.domain.user.exception.InvalidRefreshTokenException;
import com.palluxy.domain.user.repository.RefreshRepository;
import com.palluxy.global.util.CookieUtil;
import com.palluxy.global.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReissueController {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    @PostMapping("/api/reissue")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {

        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
                break;
            }
        }

        if (refresh == null) {
            throw new RefreshTokenNullException("refresh token이 존재하지 않습니다.");
        }

        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            throw new RefreshTokenExpiredException("refresh token가 만료되었습니다.");
        }

        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {
            throw new InvalidRefreshTokenException("refresh token이 아닙니다.");
        }

        Boolean isExist = refreshRepository.existsByRefresh(refresh);
        if (!isExist) {
            throw new InvalidRefreshTokenException("refresh token이 DB에 존재하지 않습니다.");
        }

        String email = jwtUtil.getEmail(refresh);
        boolean isAdmin = jwtUtil.isAdmin(refresh);

        String newAccess = jwtUtil.createJwt("access", email, isAdmin, 600000L);
        String newRefresh = jwtUtil.createJwt("refresh", email, isAdmin, 86400000L);

        refreshRepository.deleteByRefresh(refresh);
        addRefreshEntity(email, newRefresh, 86400000L);

        response.setHeader("access", newAccess);
        response.addCookie(CookieUtil.createCookie("refresh", refresh));

        return ResponseEntity.ok().build();
    }

    private void addRefreshEntity(String email, String refresh, Long expiredMs) {
        Date date = new Date(System.currentTimeMillis() + expiredMs);

        Refresh refreshEntity = Refresh.builder()
            .email(email)
            .refresh(refresh)
            .expiration(date.toString())
            .build();

        refreshRepository.save(refreshEntity);
    }
}
