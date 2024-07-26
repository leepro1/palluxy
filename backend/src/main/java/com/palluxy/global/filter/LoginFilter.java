package com.palluxy.global.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.palluxy.domain.user.dto.CustomUserDetails;
import com.palluxy.domain.user.dto.request.LoginRequest;
import com.palluxy.domain.user.dto.response.LoginUserResponse;
import com.palluxy.domain.user.entity.Refresh;
import com.palluxy.domain.user.repository.RefreshRepository;
import com.palluxy.global.common.CommonResponse;
import com.palluxy.global.util.CookieUtil;
import com.palluxy.global.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
        HttpServletResponse response) throws AuthenticationException {

        LoginRequest loginRequest;

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            loginRequest = objectMapper.readValue(messageBody, LoginRequest.class);
        } catch (IOException e) {
            try {
                handleException(response, e, "Failed to parse login request");
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
            return null;
        }

        try {
            String email = loginRequest.email();
            String password = loginRequest.password();

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                email, password, null);

            return authenticationManager.authenticate(authToken);
        } catch (AuthenticationException e) {
            try {
                handleException(response, e, "Authentication failed");
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
            return null;
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
        HttpServletResponse response, FilterChain chain, Authentication authentication)
        throws IOException {

        try {
            String email = authentication.getName();
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            boolean isAdmin = authorities.stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));

            String access = jwtUtil.createJwt("access", email, isAdmin, 600000L);
            String refresh = jwtUtil.createJwt("refresh", email, isAdmin, 86400000L);

            addRefreshEntity(email, refresh, 86400000L);

            response.setHeader("access", access);
            response.addCookie(CookieUtil.createCookie("refresh", refresh));
            response.setStatus(HttpStatus.OK.value());

            LoginUserResponse loginUserResponse = LoginUserResponse.of(userDetails);
            CommonResponse<LoginUserResponse> responseBody = CommonResponse.ok("Authentication successful", loginUserResponse);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(new ObjectMapper().writeValueAsString(responseBody));
        } catch (Exception e) {
            handleException(response, e, "An error occurred during authentication");
        }
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

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
        HttpServletResponse response, AuthenticationException failed) throws IOException {

        CommonResponse<String> errorResponse = CommonResponse.unauthorized("Authentication failed", null);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
    }

    private void handleException(HttpServletResponse response, Exception e, String message) throws IOException {
        CommonResponse<String> errorResponse = CommonResponse.badRequest(message + ": " + e.getMessage());

        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
    }
}
