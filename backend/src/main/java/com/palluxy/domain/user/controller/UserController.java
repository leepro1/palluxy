package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.dto.request.UserSignupRequest;
import com.palluxy.domain.user.exception.SignupFormatException;
import com.palluxy.domain.user.service.UserService;
import com.palluxy.global.common.CommonResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<?> join(@Valid @RequestBody UserSignupRequest request, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new SignupFormatException();
        }
        userService.signup(request);
        return CommonResponse.created("회원가입 성공");
    }

    @GetMapping("/{nickname}")
    public CommonResponse<?> deleteMember(@PathVariable("nickname") String nickname) {
        userService.duplicateNickname(nickname);
        return CommonResponse.ok("닉네임 사용 가능");
    }
}