package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.dto.request.UserResetPasswordRequest;
import com.palluxy.domain.user.dto.request.UserSignupRequest;
import com.palluxy.domain.user.dto.response.UserResponse;
import com.palluxy.domain.user.exception.SignupFormatException;
import com.palluxy.domain.user.service.UserService;
import com.palluxy.global.common.data.CommonResponse;
import com.palluxy.global.common.error.NotAuthorityException;
import com.palluxy.global.common.util.AuthUtil;
import jakarta.validation.Valid;
import java.util.Objects;
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
    public CommonResponse<?> join(@Valid @RequestBody UserSignupRequest request,
        BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new SignupFormatException();
        }
        userService.signup(request);
        return CommonResponse.created("회원가입 성공");
    }

    @GetMapping("/user-info")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> getUserInfo() {
        Long userId = AuthUtil.checkAuthorityByUserId();

        UserResponse user = userService.getUserById(userId);
        return CommonResponse.ok("토큰으로 user 정보 조회", user);
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

    @PatchMapping("/reset-password")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> resetPassword(@Valid @RequestBody UserResetPasswordRequest request,
        BindingResult bindingResult) {
        userService.resetPassword(request);
        return CommonResponse.ok("비밀번호 변경 성공");
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> getUserById(@PathVariable Long id) {
        Long userId = AuthUtil.checkAuthorityByUserId();

        if (!Objects.equals(userId, id)) {
            throw new NotAuthorityException("권한이 없습니다.");
        }

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