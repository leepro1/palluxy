package com.palluxy.domain.user.service;

import com.palluxy.domain.user.dto.request.UserResetPasswordRequest;
import com.palluxy.domain.user.dto.request.UserSignupRequest;
import com.palluxy.domain.user.dto.response.UserResponse;
import com.palluxy.domain.user.entity.User;
import com.palluxy.domain.user.exception.BadResetPasswordCodeUserException;
import com.palluxy.domain.user.exception.DuplicateUserException;
import com.palluxy.domain.user.repository.UserRepository;
import com.palluxy.global.common.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final StringRedisTemplate redisTemplate;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public void signup(UserSignupRequest request) {
    duplicateEmail(request.email());
    duplicateNickname(request.nickname());

    User user = User.builder()
        .email(request.email())
        .nickname(request.nickname())
        .password(bCryptPasswordEncoder.encode(request.password()))
        .acceptedTerms(request.acceptedTerms())
        .build();

    userRepository.save(user);
  }

  @Override
  public void duplicateEmail(String email) {
    userRepository.findByEmail(email)
        .ifPresent(user -> {
          throw new DuplicateUserException("이미 가입한 회원입니다.");
        });
  }

  @Override
  public void duplicateNickname(String nickname) {
    userRepository.findByNickname(nickname)
        .ifPresent(user -> {
          throw new DuplicateUserException("이미 존재하는 닉네임입니다.");
        });
  }

  @Override
  public void resetPassword(UserResetPasswordRequest request) {
    String resetCode = request.code();

    if (!Boolean.TRUE.equals(redisTemplate.hasKey(resetCode))) {
      throw new BadResetPasswordCodeUserException("해당 URL이 일치하지 않습니다.");
    }

    String email = redisTemplate.opsForValue().get(resetCode);
    if (email != null) {
      String encodedPassword = bCryptPasswordEncoder.encode(request.password());
      userRepository.updatePasswordByEmail(email, encodedPassword);
    } else {
      throw new BadResetPasswordCodeUserException("유효하지 않은 코드입니다.");
    }
  }

  @Override
  public List<UserResponse> getUsers() {
    List<User> data = userRepository.findAll();
    if (data.isEmpty()) {
      throw new NotFoundException("user");
    }

    return data.stream()
        .map(UserResponse::of)
        .toList();
  }

  @Override
  public UserResponse getUserById(Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("user : " + id));

    return UserResponse.of(user);
  }

  @Override
  public UserResponse getUserByEmail(String email) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new NotFoundException("user : " + email));

    return UserResponse.of(user);
  }

  @Override
  public UserResponse getUserByNickname(String nickname) {
    User user = userRepository.findByNickname(nickname)
        .orElseThrow(() -> new NotFoundException("user : " + nickname));

    return UserResponse.of(user);
  }
}