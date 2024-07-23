package com.palluxy.domain.letter.dto.claude;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class ClaudeResponse {

  private String id;
  private String type;
  private String role;
  private String model;
  private List<MessageOutput> content;
  private String stop_reason;
  private String stop_sequence;
  private Usage usage;
}
