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
        if (!this.type().trim().equals("message")) {
            return "편지는 잘 받아봤어요. 그런데 제가 아직 한글이 어려워서 무슨 말인지 정확하게 이해를 못했어요. 다시 보내주시면 제가 주변 친구들한테 물어서 답장써볼게요!";
        }
        return this.content.get(0).text;
    }

    record Error(String type, String message) {

    }

    record ClaudeUsage(int input_tokens, int output_tokens) {

    }

    record ClaudeMessageOutput(String text, String type) {

    }
}
