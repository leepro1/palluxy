package com.palluxy.domain.letter.dto.gemini;

import com.google.gson.JsonObject;
import lombok.Getter;

@Getter
public class Part {
    private String text;

    public Part(String text) {
        this.text = text;
    }

    public JsonObject toJsonObject() {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("text", text);
        return jsonObject;
    }
}