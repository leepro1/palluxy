package com.palluxy.domain.letter.dto.gemini;

import java.util.List;

public record GeminiResponse(List<Candidate> candidates,
                             UsageMetadata usageMetadata) {


    public String getText() {
        return candidates.get(0).content.parts.get(0).text;
    }

    record Candidate(
        Content content,
        String finishReason,
        int index,
        List<SafetyRating> safetyRatings) {

    }

    record Content(
        List<Part> parts,
        String role) {

    }

    record Part(String text) {

    }

    record SafetyRating(
        String category,
        String probability) {

    }

    record UsageMetadata(
        int promptTokenCount,
        int candidatesTokenCount,
        int totalTokenCount) {

    }
}