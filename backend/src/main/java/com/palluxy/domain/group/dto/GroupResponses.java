package com.palluxy.domain.group.dto;

import java.util.List;

public record GroupResponses(
    List<GroupResponse> groups,
    Long totalGroupCount
) {

}
