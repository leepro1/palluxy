package com.palluxy.domain.letter.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class ClaudeMessageOutput {
  private String text;
  private String type;
}
