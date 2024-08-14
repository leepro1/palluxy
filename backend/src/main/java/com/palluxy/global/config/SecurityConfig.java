package com.palluxy.global.config;

import com.palluxy.domain.user.service.RefreshServiceImpl;
import com.palluxy.global.common.error.CustomAuthenticationEntryPoint;
import com.palluxy.global.common.error.CustomAccessDeniedHandler;
import com.palluxy.global.common.filter.CustomLogoutFilter;
import com.palluxy.global.common.filter.JWTFilter;
import com.palluxy.global.common.filter.LoginFilter;
import com.palluxy.global.common.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static com.palluxy.global.common.constant.CORS_SET.*;
import static com.palluxy.global.common.constant.SECURITY_SET.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    private final RefreshServiceImpl refreshService;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
        throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> cors
                .configurationSource(configurationSource())
            )

            .csrf((csrf) -> csrf
                .disable()
            )

            .formLogin((loginForm) -> loginForm.
                disable()
            )

            .httpBasic((basic) -> basic
                .disable()
            )

            .authorizeHttpRequests((auth) -> auth
                .requestMatchers(PERMITALL_URL_PATTERNS).permitAll()
                .requestMatchers(NEED_LOGIN_URL_PATTERNS).authenticated()
                .requestMatchers(NEED_ADMIN_ROLE_URL_PATTERNS).hasRole("ROLE_ADMIN")
                .anyRequest().permitAll()
            )

            .addFilterAt(
                new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil,
                    refreshService),
                UsernamePasswordAuthenticationFilter.class
            )

            .addFilterBefore(
                new JWTFilter(jwtUtil), LoginFilter.class
            )

            .addFilterBefore(
                new CustomLogoutFilter(jwtUtil, refreshService), LogoutFilter.class
            )

            .sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .exceptionHandling((exceptions) -> exceptions
                .authenticationEntryPoint(customAuthenticationEntryPoint)
                .accessDeniedHandler(customAccessDeniedHandler)
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource configurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(ALLOWED_ORIGINS);
        configuration.setAllowedHeaders(ALLOWED_HEADERS);
        configuration.setAllowedMethods(ALLOWED_METHODS);
        configuration.setAllowCredentials(ALLOWED_CREDENTIALS);
        configuration.setExposedHeaders(EXPOSED_HEADERS);
        configuration.setMaxAge(MAX_AGE_1H);

        UrlBasedCorsConfigurationSource corsConfigSource = new UrlBasedCorsConfigurationSource();
        corsConfigSource.registerCorsConfiguration("/**", configuration);

        return corsConfigSource;
    }
}
