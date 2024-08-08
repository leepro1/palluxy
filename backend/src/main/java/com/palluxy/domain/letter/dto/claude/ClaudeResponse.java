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
    ClaudeUsage claudeUsage,
    Error error) {

    public String getText() {
        return this.content.get(0).text;
    }

    public String getErrorMessage() {
        return this.error.message;
    }

    record Error(String type, String message) {

    }

    record ClaudeUsage(int input_tokens, int output_tokens) {

    }

    record ClaudeMessageOutput(String text, String type) {

    }
}
