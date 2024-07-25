package com.palluxy.domain.letter.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
public class ClaudeResponse {

  private String id;
  private String type;
  private String role;
  private String model;
  private List<ClaudeMessageOutput> content;
  private String stop_reason;
  private String stop_sequence;
  private ClaudeUsage claudeUsage;
}
