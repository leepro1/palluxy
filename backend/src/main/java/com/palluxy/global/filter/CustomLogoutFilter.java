package com.palluxy.global.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.palluxy.domain.user.repository.RefreshRepository;
import com.palluxy.global.common.CommonResponse;
import com.palluxy.global.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.GenericFilterBean;

@RequiredArgsConstructor
public class CustomLogoutFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
        FilterChain filterChain) throws IOException, ServletException {
        doFilter((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse,
            filterChain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws IOException, ServletException {

        String requestUri = request.getRequestURI();
        if (!requestUri.matches("^\\/logout$")) {
            filterChain.doFilter(request, response);
            return;
        }

        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String refresh = null;
            Cookie[] cookies = request.getCookies();
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh")) {
                    refresh = cookie.getValue();
                }
            }

            if (refresh == null) {
                throw new IllegalArgumentException("Refresh token is missing");
            }

            try {
                jwtUtil.isExpired(refresh);
            } catch (ExpiredJwtException e) {
                throw new IllegalArgumentException("Refresh token is expired");
            }

            String category = jwtUtil.getCategory(refresh);
            if (!category.equals("refresh")) {
                throw new IllegalArgumentException("Invalid refresh token");
            }

            Boolean isExist = refreshRepository.existsByRefresh(refresh);
            if (!isExist) {
                throw new IllegalArgumentException("Refresh token does not exist");
            }

            refreshRepository.deleteByRefresh(refresh);

            Cookie cookie = new Cookie("refresh", null);
            cookie.setMaxAge(0);
            cookie.setPath("/");

            response.addCookie(cookie);
            response.setStatus(HttpServletResponse.SC_OK);

            CommonResponse<?> responseBody = CommonResponse.ok("Logout successful");
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));

        } catch (Exception e) {
            handleException(response, e);
        }
    }

    private void handleException(HttpServletResponse response, Exception e) throws IOException {
        CommonResponse<String> errorResponse = CommonResponse.badRequest(e.getMessage());
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
    }
}
