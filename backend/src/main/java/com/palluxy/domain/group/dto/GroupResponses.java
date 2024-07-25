package com.palluxy.domain.group.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class GroupResponses {
  private Long totalGroupCount;
  private List<GroupResponse> groups;

  public GroupResponses(List<GroupResponse> groups, Long totalGroupCount) {
    this.groups = groups;
    this.totalGroupCount = totalGroupCount;
  }
}
