package com.palluxy.domain.letter.dto;

import com.google.gson.JsonObject;
import lombok.Data;

@Data
public class MessageInput {
  private ClaudeRole role;
  private String content;

  public JsonObject toJsonObject() {
    JsonObject object = new JsonObject();
    object.addProperty("role", role.toString());
    object.addProperty("content", content);
    return object;
  }
}
