package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.dto.request.UserResetPasswordRequest;
import com.palluxy.domain.user.dto.request.UserSignupRequest;
import com.palluxy.domain.user.dto.response.UserResponse;
import com.palluxy.domain.user.exception.SignupFormatException;
import com.palluxy.domain.user.service.UserService;
import com.palluxy.global.common.CommonResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/check-email/{email}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> checkEmail(@PathVariable("email") String email) {
        userService.duplicateEmail(email);
        return CommonResponse.ok("이메일 사용 가능");
    }

    @GetMapping("/check-nickname/{nickname}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> checkNickname(@PathVariable("nickname") String nickname) {
        userService.duplicateNickname(nickname);
        return CommonResponse.ok("닉네임 사용 가능");
    }

    @GetMapping("/reset-password")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> resetPassword(@RequestParam("code") String code) {
        userService.verifyResetPasswordCode(code);
        return CommonResponse.ok("비밀번호 code 인증 성공");
    }

    @PatchMapping("/reset-password")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> resetPassword(@Valid @RequestBody UserResetPasswordRequest request, BindingResult bindingResult) {
        userService.resetPassword(request);
        return CommonResponse.ok("비밀번호 변경 성공");
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> getUsers() {
        List<UserResponse> response = userService.getUsers();
        return CommonResponse.ok("유저 리스트 조회 성공", response);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> getUserById(@PathVariable Long id) {
        UserResponse response = userService.getUserById(id);
        return CommonResponse.ok("유저조회 성공", response);
    }

    @GetMapping("/email/{email}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> getUserByEmail(@PathVariable String email) {
        UserResponse response = userService.getUserByEmail(email);
        return CommonResponse.ok("유저조회 성공", response);
    }

    @GetMapping("/nickname/{nickname}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> getUserByNickname(@PathVariable String nickname) {
        UserResponse response = userService.getUserByNickname(nickname);
        return CommonResponse.ok("유저조회 성공", response);
    }
}