package com.palluxy.domain.letter.controller;

import com.palluxy.domain.letter.dto.ClaudeRequest;
import com.palluxy.domain.letter.dto.LetterDto;
import com.palluxy.domain.letter.util.ClaudeUtil;
import com.palluxy.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/letter")
@RequiredArgsConstructor
public class letterController {

    private final ClaudeUtil claudeUtil;

    @GetMapping
    public CommonResponse<?> getLetter() {
        //test
        String letter = claudeUtil.getLetter();
        return CommonResponse.ok(letter);
    }

}
