package com.palluxy.global.config;

import com.palluxy.domain.user.repository.RefreshRepository;
import com.palluxy.global.filter.JWTFilter;
import com.palluxy.global.filter.LoginFilter;
import com.palluxy.global.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Collections;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

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
            .cors((cors) -> cors
                .configurationSource(new CorsConfigurationSource() {

                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(
                            Collections.singletonList("http://localhost:5173"));
                        configuration.setAllowedMethods(Collections.singletonList("*"));
                        configuration.setAllowCredentials(true);
                        configuration.setAllowedHeaders(Collections.singletonList("*"));
                        configuration.setMaxAge(3600L);

                        configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                        return configuration;
                    }
                })
            )

            .csrf((csrf) -> csrf
                .disable()
            )

            .formLogin((loginForm) -> loginForm
                .disable()
            )

            .httpBasic((basic) -> basic
                .disable()
            )

            .authorizeHttpRequests((auth) -> auth
//                    .requestMatchers("/", "/api/signup").permitAll()
//                    .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    .requestMatchers(
                        "/api/reissue",
                        "/v3/api-docs/**",
                        "/swagger-ui/html",
                        "/swagger-ui/**")
                    .permitAll()
                    .requestMatchers("/api/**").permitAll()
//                .anyRequest().authenticated()
            )

            .addFilterAt(
                new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil,
                    refreshRepository),
                UsernamePasswordAuthenticationFilter.class
            )

            .addFilterBefore(
                new JWTFilter(jwtUtil), LoginFilter.class
            )

            .sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        return http.build();
    }
}
