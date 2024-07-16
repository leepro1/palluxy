package com.palluxy.domain.user.service;

import com.palluxy.domain.user.dto.request.UserSignupRequest;
import com.palluxy.domain.user.exception.DuplicateUserException;

public interface UserService {

    void signup(UserSignupRequest request) throws DuplicateUserException;

    void duplicateNickname(String nickname) throws DuplicateUserException;
}
