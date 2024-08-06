package com.palluxy.domain.group.dto;

import java.util.Map;

public record ConnectionRequest(
    Long userId,
    Long groupId,
    Map<String, Object> params,
    boolean isBanned) {

}
