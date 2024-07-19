package com.palluxy.domain.letter.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Component
@RequiredArgsConstructor
public class ClaudeUtil {

    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;

    @Value("${claude.api.key}")
    private String apiKey;

    @Value("${claude.api.url}")
    private String apiUrl;
    public String getLetter() {
        try {
            String response = webClientBuilder.build()
                    .post()
                    .uri(apiUrl)
                    .header("x-api-key", apiKey)
//                    .header("anthropic-version", "2023-06-01")
                    .header("content-type", "application/json")
                    .bodyValue("안녕")
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return parseResponse(response);
        } catch (WebClientResponseException e) {
            System.out.println("Error response body: " + e.getResponseBodyAsString());
            throw new RuntimeException("API 요청 실패: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("API 요청 실패", e);
        }
    }
    private String parseResponse(String response) {
        try {
            JsonNode jsonNode = objectMapper.readTree(response);
            return jsonNode.path("content").path(0).path("text").asText();
        } catch (Exception e) {
            throw new RuntimeException("응답 파싱 실패", e);
        }
    }
}