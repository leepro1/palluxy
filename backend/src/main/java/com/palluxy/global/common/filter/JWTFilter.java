package com.palluxy.global.common.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.palluxy.domain.user.dto.CustomUserDetails;
import com.palluxy.domain.user.entity.User;
import com.palluxy.global.common.data.CommonResponse;
import com.palluxy.global.common.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        String accessToken = request.getHeader("access");

        if (accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            CommonResponse<?> responseBody = CommonResponse.unauthorized("access token이 만료되었습니다.");

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));

            return;
        }

        String category = jwtUtil.getCategory(accessToken);

        if (!category.equals("access")) {

            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            CommonResponse<?> responseBody = CommonResponse.unauthorized("access token이 유효하지 않습니다.");

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));

            return;
        }

        Long userId = jwtUtil.getUserId(accessToken);
        boolean isAdmin = jwtUtil.isAdmin(accessToken);

        User user = new User(userId, isAdmin);
        CustomUserDetails customUserDetails = new CustomUserDetails(user);

        Authentication authToken = new UsernamePasswordAuthenticationToken(
            customUserDetails,
            null,
            isAdmin ?
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")) :
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}