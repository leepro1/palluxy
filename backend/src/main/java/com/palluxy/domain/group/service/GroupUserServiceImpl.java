package com.palluxy.domain.group.service;

import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.GroupUser;
import com.palluxy.domain.group.repository.GroupUserRepository;
import com.palluxy.domain.user.entity.User;
import com.palluxy.global.common.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupUserServiceImpl implements GroupUserService {

  private final GroupUserRepository groupUserRepository;

  public GroupUser findByGroupIdAndUserId(Long groupId, Long userId) {
    Optional<GroupUser> groupUser = groupUserRepository.findByGroupIdAndUserId(groupId, userId);
    if (groupUser.isEmpty()) {
      throw new NotFoundException("groupUser");
    }
    return groupUser.get();
  }

  public void createGroupUser(Group group, User user, boolean isLeader) {
    GroupUser groupUser = new GroupUser(group, user);
    groupUser.updateIsLeader(isLeader);
    groupUserRepository.saveAndFlush(groupUser);
  }

  public void delete(GroupUser groupUser) {
    groupUserRepository.delete(groupUser);
  }

  public void updateIsBanned(GroupUser groupUser) {
    groupUser.updateIsBanned(true);
    groupUserRepository.saveAndFlush(groupUser);
  }
}
