package com.palluxy.domain.group.service;

import com.palluxy.domain.group.dto.GroupRequest;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.GroupHistory;
import com.palluxy.domain.group.entity.GroupUser;
import com.palluxy.domain.group.entity.Status;
import com.palluxy.domain.user.entity.*;
import com.palluxy.domain.group.exception.NotFoundException;
import com.palluxy.domain.group.exception.ValidateException;
import com.palluxy.domain.group.repository.GroupHistoryRepository;
import com.palluxy.domain.group.repository.GroupRepository;
import com.palluxy.domain.group.repository.GroupUserRepository;
import com.palluxy.domain.user.repository.UserRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupService {

  private final GroupRepository groupRepository;
  private final GroupUserRepository groupUserRepository;
  private final GroupHistoryRepository groupHistoryRepository;
  private final UserRepository userRepository;

  public List<Group> findAllGroups() {
    return groupRepository.findAll();
  }

  public Page<Group> findByStatus(Status status, Pageable pageable) {
    return groupRepository.findByStatus(status, pageable);
  }

  public Group findById(Long groupId) {
    Optional<Group> findGroup = groupRepository.findById(groupId);
    if (findGroup.isEmpty()) {
      throw new NotFoundException("그룹");
    }

    return findGroup.get();
  }

  public GroupUser findByGroupIdAndUserId(Long groupId, Long userId) {
    Optional<GroupUser> groupUser = groupUserRepository.findByGroupIdAndUserId(groupId, userId);
    if (groupUser.isEmpty()) {
      throw new NotFoundException("모임 참가자");
    }

    return groupUser.get();
  }

  public void createGroup(Group group) {
    Optional<User> leader = userRepository.findById(group.getLeader().getId());
    if (leader.isEmpty()) {
      throw new NotFoundException("유저");
    }

    group.setStatus(Status.WAIT);
    group.setRemainingCapacity(group.getMaxCapacity() - 1);
    groupRepository.saveAndFlush(group);

    createGroupUser(group, leader.get(), true);
  }

  public void createHistory(GroupHistory groupHistory) {
    groupHistoryRepository.saveAndFlush(groupHistory);
  }

  public void createJoin(Long groupId, Long userId) {
    Group group = findById(groupId);
    Optional<User> user = userRepository.findById(userId);
    if (user.isEmpty()) {
      throw new NotFoundException("유저");
    }
    createGroupUser(group, user.get(), false);

    group.setRemainingCapacity(group.getRemainingCapacity() - 1);
    groupRepository.saveAndFlush(group);
  }

  private void createGroupUser(Group group, User user, boolean isLeader) {
    GroupUser groupUser = new GroupUser(group, user);
    groupUser.setLeader(isLeader);
    groupUserRepository.saveAndFlush(groupUser);

    group.setRemainingCapacity(group.getRemainingCapacity() - 1);
    groupRepository.saveAndFlush(group);
  }

  public void saveAndFlushGroupUser(GroupUser groupUser) {
    groupUserRepository.saveAndFlush(groupUser);
  }

  public void cancelJoin(Long groupId, Long userId) {
    Optional<GroupUser> findGroupUser = groupUserRepository.findByGroupIdAndUserId(groupId, userId);
    if (findGroupUser.isEmpty()) {
      throw new NotFoundException("모임 참가자");
    }

    GroupUser groupUser = findGroupUser.get();
    Group group = findById(groupId);
    if (groupUser.isLeader()) {
      group.setStatus(Status.CANCEL);
      return;
    }

    groupUserRepository.delete(groupUser);
    group.setRemainingCapacity(group.getRemainingCapacity() + 1);
    groupRepository.saveAndFlush(group);
  }

  public void updateGroupByUser(Long groupId, Group request) {
    Group group = findById(groupId);
    group.updateInfo(request);
    groupRepository.saveAndFlush(group);
  }

  public Page<Group> searchByKey(String key, String value, Pageable pageable) {
    switch (key) {
      case "title":
        return groupRepository.findByTitleContaining(value, pageable);
      case "leader":
        return groupRepository.findByLeaderContaining(value, pageable);
      default:
        throw new ValidateException("유효하지 않은 key가 요청됨");
    }
  }

  public Page<Group> findAvailableGroups(Pageable pageable) {
    return groupRepository.findAvailableGroup(Status.ACCEPT, 0, LocalDateTime.now(), pageable);
  }

  public Page<Group> findGroupsByUserId(Long userId, Pageable pageable) {
    return groupRepository.findGroupsByUserId(userId, pageable);
  }
}
