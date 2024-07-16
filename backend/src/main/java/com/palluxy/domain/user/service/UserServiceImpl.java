package com.palluxy.domain.user.service;

import com.palluxy.domain.user.dto.request.UserSignupRequest;
import com.palluxy.domain.user.entity.User;
import com.palluxy.domain.user.exception.DuplicateUserException;
import com.palluxy.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public void signup(UserSignupRequest request) {
        Optional<User> find = userRepository.findByEmail(request.email());

        if (find.isPresent()) {
            throw new DuplicateUserException("이미 가입된 이메일입니다.");
        }

        User user = new User(request.email(), request.nickname(), request.password(), request.acceptedTerms());

        userRepository.save(user);
    }

    @Override
    public void duplicateNickname(String nickname) {
        Optional<User> find = userRepository.findByNickname(nickname);

        if (find.isPresent()) {
            throw new DuplicateUserException("이미 존재하는 닉네임입니다.");
        }
    }
}