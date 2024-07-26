package com.palluxy.global.error;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.palluxy.global.common.CommonResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");
        CommonResponse<?> errorResponse = CommonResponse.forbidden(accessDeniedException.getMessage(), null);
        response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
    }
}
