package com.palluxy.domain.letter.dto;

import lombok.Data;

import java.util.HashMap;
import java.util.List;

@Data
public class ClaudeRequest {
    private final String model = "claude-3-5-sonnet-20240620";
  //    private List<LetterDto> messages;
  private HashMap<String, String> messages = new HashMap<>();
}
