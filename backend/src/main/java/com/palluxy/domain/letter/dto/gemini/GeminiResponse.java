package com.palluxy.domain.letter.dto.gemini;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;

public class GeminiResponse {

    List<Candidate> candidates;
    UsageMetadata usageMetadata;

    static class Candidate {
        Content content;
        String finishReason;
        int index;
        List<SafetyRating> safetyRatings;
    }

    static class Content {
        List<Part> parts;
        String role;
    }

    static class SafetyRating {
        String category;
        String probability;
    }

    static class UsageMetadata {
        int promptTokenCount;
        int candidatesTokenCount;
        int totalTokenCount;
    }

    public String getText() {
        return candidates.get(0).content.parts.get(0).getText();  // 변경된 부분
    }
}
