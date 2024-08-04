package com.palluxy.domain.letter.dto.claude;

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
