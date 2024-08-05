package com.palluxy.domain.user.service;

public interface RefreshService {

  void saveRefreshToken(String token, Long userId);

  Long getUserIdFromToken(String token);

  void deleteRefreshToken(String token);

  boolean isTokenExists(String token);
}
