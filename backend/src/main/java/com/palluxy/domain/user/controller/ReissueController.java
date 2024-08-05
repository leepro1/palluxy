package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.exception.RefreshTokenNullException;
import com.palluxy.domain.user.exception.RefreshTokenExpiredException;
import com.palluxy.domain.user.exception.InvalidRefreshTokenException;
import com.palluxy.domain.user.service.RefreshService;
import com.palluxy.domain.user.service.RefreshServiceImpl;
import com.palluxy.global.common.util.CookieUtil;
import com.palluxy.global.common.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import static com.palluxy.global.common.constant.JWT_SET.*;

@RestController
@RequiredArgsConstructor
public class ReissueController {

  private final JWTUtil jwtUtil;
  private final RefreshService refreshService;

  @PostMapping("/api/reissue")
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {

    String refresh = null;
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals("refresh")) {
          refresh = cookie.getValue();
          break;
        }
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

    if (!refreshService.isTokenExists(refresh)) {
      throw new InvalidRefreshTokenException("refresh token이 DB에 존재하지 않습니다.");
    }

    Long userId = jwtUtil.getUserId(refresh);
    boolean isAdmin = jwtUtil.isAdmin(refresh);

    String newAccess = jwtUtil.createJwt("access", userId, isAdmin, ACCESS_TOKEN_EXPIRATION);
    String newRefresh = jwtUtil.createJwt("refresh", userId, isAdmin, REFRESH_TOKEN_EXPIRATION);

    refreshService.deleteRefreshToken(refresh);
    refreshService.saveRefreshToken(newRefresh, userId);

    response.setHeader("access", newAccess);

    Cookie cookie = CookieUtil.createCookie("refresh", newRefresh);
    CookieUtil.addSameSiteCookieAttribute(response, cookie);

    return ResponseEntity.ok().build();
  }
}
