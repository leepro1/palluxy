package com.palluxy.domain.letter.dto.claude;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Usage {
    private int input_tokens;
    private int output_tokens;
}
