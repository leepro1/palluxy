package com.palluxy.domain.letter.dto;

import java.util.ArrayList;
import lombok.Data;

import java.util.List;

@Data
public class ClaudeRequest {
    private String model = "claude-3-5-sonnet-20240620";
    private int maxTokens = 1024;
  private List<MessageInput> messageInputs = new ArrayList<>();
}
