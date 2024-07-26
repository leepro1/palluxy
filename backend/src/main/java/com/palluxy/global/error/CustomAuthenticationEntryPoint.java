package com.palluxy.global.error;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.palluxy.global.common.CommonResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        CommonResponse<?> errorResponse = CommonResponse.unauthorized(authException.getMessage(), null);
        response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
    }
}
