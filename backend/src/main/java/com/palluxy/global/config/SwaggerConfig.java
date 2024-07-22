package com.palluxy.global.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("펠럭시 프로젝트")
                .version("1.0.0"));
    }

    private Info apiInfo() {
        return new Info()
            .title("Springdoc 테스트")
            .description("Springdoc을 사용한 Swagger UI 테스트")
            .version("1.0.0");
    }
}