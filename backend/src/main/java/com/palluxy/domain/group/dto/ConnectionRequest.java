package com.palluxy.domain.group.dto;

import java.util.Map;
import lombok.Getter;

@Getter
public class ConnectionRequest {
  private Long userId;
  private Long groupId;
  private Map<String, Object> params;
  private boolean isBanned;
}
