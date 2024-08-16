package com.palluxy.domain.group.dto;

import java.util.Map;

public record SessionRequest(
    Long userId,
    Long groupId,
    String approveKey,
    Map<String, Object> params) {

}
