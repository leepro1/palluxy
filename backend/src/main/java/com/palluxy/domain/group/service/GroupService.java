package com.palluxy.domain.group.service;

import com.palluxy.domain.group.dto.GroupDto;
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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;

    private final GroupUserRepository groupUserRepository;
    private final GroupHistoryRepository groupHistoryRepository;

    public List<Group> findAllGroups() {
        return groupRepository.findAll();
    }

    public List<Group> findByStatus(Status status) {
        return groupRepository.findByStatus(status);
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

    public void createGroup(Group group, User leader) {
        group.setLeader(leader);
        group.setStatus(Status.WAIT);
        group.setRemainingCapacity(group.getMaxCapacity() - 1);
    }

     public void createHistory(GroupHistory groupHistory) {
        groupHistoryRepository.saveAndFlush(groupHistory);
    }

    public void createJoin(Group group, User user) {
        GroupUser groupUser = new GroupUser(group, user);
        groupUser.setLeader(false);
        groupUserRepository.saveAndFlush(groupUser);

        group.setRemainingCapacity(group.getRemainingCapacity() - 1);
        groupRepository.saveAndFlush(group);
    }

    public void cancelJoin(Long groupId, Long userId) {
        Optional<GroupUser> findGroupUser = groupUserRepository.findByGroupIdAndUserId(groupId, userId);
        if (findGroupUser.isEmpty()) {
            throw new NotFoundException("모임 참가자");
        }

        GroupUser groupUser = findGroupUser.get();
        Group group = findById(groupId);
        if (groupUser.isLeader()) {
            groupRepository.delete(group);
            return;
        }

        groupUserRepository.delete(groupUser);
        group.setRemainingCapacity(group.getRemainingCapacity() + 1);
        groupRepository.saveAndFlush(group);
    }

    public void updateGroupByUser(Group original, Group modified) {
        original.setTitle(modified.getTitle());
        original.setDescription(modified.getDescription());
        original.setFilePath(modified.getFilePath());
        groupRepository.saveAndFlush(original);
    }

    public void updateGroupByAdmin(Group group, Status status, String key) {
        group.setStatus(status);
        group.setApproveKey(key);
        groupRepository.saveAndFlush(group);
    }

    public List<Group> searchByKey(String key, String value) {
        switch (key) {
            case "title":
                return groupRepository.findByTitleContaining(value);
            case "leader":
                return groupRepository.findByLeaderContaining(value);
            default :
                throw new ValidateException("유효하지 않은 key가 요청됨");
        }
    }
}
