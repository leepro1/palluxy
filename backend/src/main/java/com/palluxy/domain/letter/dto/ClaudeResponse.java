package com.palluxy.domain.letter.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ClaudeResponse {

  private String id;
  private String type;
  private ClaudeRole role;
  private String model;
  private MessageOutput content;
  private String stop_reason;
  private String stop_sequence;
  private String usage;
}