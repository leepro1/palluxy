package com.palluxy.domain.letter.dto.gemini;

import com.google.gson.JsonObject;
import com.palluxy.domain.letter.dto.AIRequest;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class GeminiRequest extends AIRequest {

    private List<Content> contents;

    public GeminiRequest() {
        this.contents = new ArrayList<>();
    }

    public void addContent(String text, String role) {
        Content content = new Content();
        content.parts = new Part(text);
        content.role = role;
        this.contents.add(content);
    }

    public static class Content {

        Part parts;
        String role;

        public JsonObject toJsonObject() {
            JsonObject object = new JsonObject();
            object.add("parts", parts.toJsonObject());
            object.addProperty("role", role);
            return object;
        }
    }

    static class Part {

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
}
