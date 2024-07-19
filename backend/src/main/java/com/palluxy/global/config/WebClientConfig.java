//package com.palluxy.global.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.MediaType;
//import org.springframework.web.reactive.function.client.WebClient;
//
//@Configuration
//public class WebClientConfig {
//    @Value("${anthropic.api.key}")
//    String apiKey;
//
//    @Bean
//    public WebClient webClient(){
//        return WebClient.builder()
//                    .defaultHeaders(httpHeaders -> {
//                        httpHeaders.add("x-api-key", apiKey);
//                        httpHeaders.add("anthropic-version", "2023-06-01");
//                        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//                    })
//                    .baseUrl("https://api.anthropic.com/v1/messages")
//                    .build();
//        }
//}
