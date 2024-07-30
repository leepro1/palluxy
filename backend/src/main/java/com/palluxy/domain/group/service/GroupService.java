package com.palluxy.domain.group.service;

import com.palluxy.domain.group.dto.GroupRequest;
import com.palluxy.domain.group.dto.GroupResponse;
import com.palluxy.domain.group.dto.GroupResponses;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.GroupHistory;
import com.palluxy.domain.group.entity.GroupUser;
import com.palluxy.global.common.data.Status;
import com.palluxy.domain.user.entity.*;
import com.palluxy.global.common.error.NotFoundException;
import com.palluxy.domain.group.repository.GroupHistoryRepository;
import com.palluxy.domain.group.repository.GroupRepository;
import com.palluxy.domain.group.repository.GroupUserRepository;
import com.palluxy.domain.user.repository.UserRepository;
import com.palluxy.global.config.FileStorageService;
import java.util.ArrayList;
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
  private final FileStorageService fileStorageService;

  public List<Group> findAllGroups() {
    return groupRepository.findAll();
  }

  public GroupResponses findByStatus(Status status, Pageable pageable) {
    Page<Group> groupPage = groupRepository.findByStatus(status, pageable);
    return getGroupResponses(groupPage);
  }

  public GroupResponses getGroupResponses(Page<Group> groupPage) {
    List<GroupResponse> groups = new ArrayList<>();
    for (Group group : groupPage) {
      groups.add(GroupResponse.of(group));
    }

    return new GroupResponses(groups, groupPage.getTotalElements());
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

  public Group createGroup(GroupRequest groupRequest, String filePath) {
    Optional<User> leader = userRepository.findById(groupRequest.getLeaderId());
    if (leader.isEmpty()) {
      throw new NotFoundException("유저");
    }

    Group group = Group.builder()
        .title(groupRequest.getTitle())
        .description(groupRequest.getDescription())
        .startTime(groupRequest.getStartTime())
        .endTime(groupRequest.getEndTime())
        .maxCapacity(groupRequest.getMaxCapacity())
        .remainingCapacity(groupRequest.getMaxCapacity() - 1)
        .leader(leader.get())
        .filePath(filePath)
        .build();

    group.setStatus(Status.WAIT);
    groupRepository.saveAndFlush(group);

    createGroupUser(group, leader.get(), true);
    return group;
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

    group.updateCapacity(group.getRemainingCapacity() - 1);
    groupRepository.saveAndFlush(group);
  }

  private void createGroupUser(Group group, User user, boolean isLeader) {
    GroupUser groupUser = new GroupUser(group, user);
    groupUser.setLeader(isLeader);
    groupUserRepository.saveAndFlush(groupUser);

    if (!isLeader) {
      group.updateCapacity(group.getRemainingCapacity() - 1);
    }
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
    group.updateCapacity(group.getRemainingCapacity() + 1);
    groupRepository.saveAndFlush(group);
  }

  public void updateGroupByUser(Long groupId, GroupRequest request) {
    Group group = findById(groupId);
    group.updateInfo(request.getTitle(), request.getDescription());
    groupRepository.saveAndFlush(group);
  }

  public GroupResponses searchByKey(String key, String value, Pageable pageable) {
    Page<Group> groupPage = null;
    switch (key) {
      case "title":
        groupPage = groupRepository.findByTitleContaining(value, pageable);
      case "leader":
        groupPage = groupRepository.findByLeaderContaining(value, pageable);
    }

    return getGroupResponses(groupPage);
  }

  public GroupResponses findAvailableGroups(Pageable pageable) {
    Page<Group> groupPage = groupRepository.findAvailableGroup(pageable);
    return getGroupResponses(groupPage);
  }

  public GroupResponses findGroupsByUserId(Long userId, Pageable pageable) {
    Page<Group> groupPage = groupRepository.findGroupsByUserId(userId, pageable);
    return getGroupResponses(groupPage);
  }
}
