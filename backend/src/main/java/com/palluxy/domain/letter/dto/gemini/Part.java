package com.palluxy.domain.letter.dto.gemini;

import com.google.gson.JsonObject;

public class Part {
    String text;

    public Part(String text) {
        this.text = text;
    }

    public JsonObject toJsonObject() {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("text", text);
        return jsonObject;
    }
}