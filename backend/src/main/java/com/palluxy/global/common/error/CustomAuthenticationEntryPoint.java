package com.palluxy.global.common.error;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.palluxy.global.common.data.CommonResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        CommonResponse<?> errorResponse = CommonResponse.unauthorized(authException.getMessage());
        response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
    }
}
