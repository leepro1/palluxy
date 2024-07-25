package com.palluxy.domain.letter.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class ClaudeUsage {
  private int input_tokens;
  private int output_tokens;
}
