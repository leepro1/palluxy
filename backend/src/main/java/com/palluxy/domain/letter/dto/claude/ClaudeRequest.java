package com.palluxy.domain.letter.dto.claude;

import com.palluxy.domain.letter.dto.AIRequest;
import lombok.Getter;

import java.util.List;

@Getter
public class ClaudeRequest extends AIRequest {
  private final String model = "claude-3-5-sonnet-20240620";
  private final int maxTokens = 1024;
  private List<ClaudeMessageInput> messageInputs;

  public void setMessageInputs(List<ClaudeMessageInput> messageInputs) {
    this.messageInputs = messageInputs;
  }
}
