package com.palluxy.domain.user.service;

import com.palluxy.domain.user.dto.request.UserResetPasswordRequest;
import com.palluxy.domain.user.dto.request.UserSignupRequest;
import com.palluxy.domain.user.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    void signup(UserSignupRequest request);

    void duplicateEmail(String email);

    void duplicateNickname(String nickname);

    void resetPassword(UserResetPasswordRequest request);

    void verifyResetPasswordCode(String code);

    List<UserResponse> getUsers();

    UserResponse getUserById(Long id);

    UserResponse getUserByEmail(String email);

    UserResponse getUserByNickname(String nickname);
}
