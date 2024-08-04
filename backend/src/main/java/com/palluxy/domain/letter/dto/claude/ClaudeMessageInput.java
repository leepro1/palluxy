package com.palluxy.domain.letter.dto.claude;

import com.google.gson.JsonObject;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ClaudeMessageInput {
  private ClaudeRole role;
  private String content;

  public ClaudeMessageInput() {}

  public ClaudeMessageInput(ClaudeRole role, String content) {
    this.role = role;
    this.content = content;
  }

  public JsonObject toJsonObject() {
    JsonObject object = new JsonObject();
    object.addProperty("role", role.toString());
    object.addProperty("content", content);
    return object;
  }
}
