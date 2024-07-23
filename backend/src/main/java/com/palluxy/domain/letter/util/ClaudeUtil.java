package com.palluxy.domain.letter.util;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.palluxy.domain.letter.dto.claude.ClaudeRequest;
import com.palluxy.domain.letter.dto.claude.ClaudeResponse;
import com.palluxy.domain.letter.dto.claude.MessageInput;
import com.palluxy.domain.letter.dto.claude.MessageOutput;
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

  public void sendRequest(ClaudeRequest request) {

  }

  public void sendLetter() {
  }
}
