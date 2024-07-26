package com.palluxy.domain.letter.dto.ai;

public enum ClaudeRole {
  USER {
    @Override
    public String toString() {
      return "user";
    }
  },
  ASSISTANT {
    @Override
    public String toString() {
      return "assistant";
    }
  }
}
