package com.palluxy.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

import static com.palluxy.global.common.constant.JWT_SET.*;

@Service
@RequiredArgsConstructor
public class RefreshServiceImpl implements RefreshService {

    private final RedisTemplate<String, Object> redisTemplate;

    public void saveRefreshToken(String token, Long userId) {
        redisTemplate.opsForValue()
            .set(token, userId, REFRESH_TOKEN_EXPIRATION, TimeUnit.MILLISECONDS);
    }

    public Long getUserIdFromToken(String token) {
        return (Long) redisTemplate.opsForValue().get(token);
    }

    public void deleteRefreshToken(String token) {
        redisTemplate.delete(token);
    }

    public boolean isTokenExists(String token) {
        return redisTemplate.hasKey(token);
    }
}
