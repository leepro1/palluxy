package com.palluxy.domain.letter.dto.gemini;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
public class GeminiResponse {
    List<Candidate> candidates;
    UsageMetadata usageMetadata;

    @Getter
    static class Candidate {
        Content content;
        String finishReason;
        int index;
        List<SafetyRating> safetyRatings;
    }

    @Getter
    static class Content {
        List<Part> parts;
        String role;
    }

    @Getter
    static class Part {
        String text;
    }

    @Getter
    static class SafetyRating {
        String category;
        String probability;
    }

    @Getter
    static class UsageMetadata {
        int promptTokenCount;
        int candidatesTokenCount;
        int totalTokenCount;
    }

    public String getText() {
        return candidates.get(0).content.parts.get(0).text;
    }
}