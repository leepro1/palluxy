package com.palluxy.domain.group.service;

import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.GroupUser;
import com.palluxy.domain.user.entity.User;

public interface GroupUserService {

    GroupUser findByGroupIdAndUserId(Long groupId, Long userId);

    void createGroupUser(Group group, User user, boolean isLeader);

    void delete(GroupUser groupUser);

    void updateIsBanned(GroupUser groupUser);
}
