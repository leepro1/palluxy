package com.palluxy.domain.letter.dto.claude;

import lombok.Getter;

import java.util.List;

@Getter
public class ClaudeRequest {
  private String model = "claude-3-5-sonnet-20240620";
  private int maxTokens = 1024;
  private List<MessageInput> messageInputs;

  public void setMessageInputs(List<MessageInput> messageInputs) {
    this.messageInputs = messageInputs;
  }
}
