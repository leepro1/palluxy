package com.palluxy.domain.letter.util;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.palluxy.domain.letter.dto.ClaudeRequest;
import com.palluxy.domain.letter.dto.MessageInput;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class ClaudeUtil {

  @Value("${claude.api.key}")
  private String API_KEY;

  @Value("${claude.api.url}")
  private String API_URL;

  public String sendRequest(ClaudeRequest request) {
    JsonObject object = new JsonObject();
    object.addProperty("model", request.getModel());
    object.addProperty("max_tokens", request.getMaxTokens());

    JsonArray messages = new JsonArray();
    for (MessageInput messageInput : request.getMessageInputs()) {
      messages.add(messageInput.toJsonObject());
    }
    object.add("messages", messages);

    String json = object.toString();
    WebClient webClient =
        WebClient.builder()
            .baseUrl(API_URL)
            .defaultHeader("x-api-key", API_KEY)
            .defaultHeader("anthropic-version", "2023-06-01")
            .defaultHeader("content-type", "application/json")
            .build();

    String response = webClient.post().bodyValue(json).retrieve().bodyToMono(String.class).block();

    return response;
  }
}
