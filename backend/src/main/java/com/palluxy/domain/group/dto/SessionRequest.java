package com.palluxy.domain.group.dto;

import java.util.Map;
import lombok.Getter;

@Getter
public class SessionRequest {
  private Long userId;
  private Long groupId;
  private String approveKey;
  private Map<String, Object> params;
}
