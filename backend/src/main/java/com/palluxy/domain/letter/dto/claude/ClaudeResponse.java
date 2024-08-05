package com.palluxy.domain.letter.dto.claude;

import java.util.List;

public record ClaudeResponse(
    String id,
    String type,
    String role,
    String model,
    List<ClaudeMessageOutput> content,
    String stop_reason,
    String stop_sequence,
    ClaudeUsage claudeUsage) {

    public String getText() {
        return this.content.get(0).text;
    }

    record ClaudeUsage(int input_tokens, int output_tokens) {

    }

    record ClaudeMessageOutput(String text, String type) {

    }
}
