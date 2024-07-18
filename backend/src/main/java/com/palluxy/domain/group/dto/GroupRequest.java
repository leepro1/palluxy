package com.palluxy.domain.group.dto;

import com.palluxy.domain.group.entity.Group;
import lombok.Data;

@Data
public class GroupRequest {
    private Group group;
    private Long userId;
}
