package com.palluxy.domain.letter.dto.claude;

import lombok.Getter;

@Getter
public class ClaudeUsage {
  private int input_tokens;
  private int output_tokens;
}
