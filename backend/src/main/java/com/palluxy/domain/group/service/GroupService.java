package com.palluxy.domain.group.service;

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
import java.util.Random;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final GroupUserRepository groupUserRepository;
    private final GroupHistoryRepository groupHistoryRepository;
    private Random random = new Random();

    public List<Group> findAllGroups() {
        List<Group> findGroups =  groupRepository.findAll();
        if (findGroups.isEmpty()) {
            throw new NotFoundException("그룹");
        }

        return findGroups;
    }

    public List<Group> findByStatus(Status status) {
        List<Group> findGroups =  groupRepository.findByStatus(status);
        if (findGroups.isEmpty()) {
            throw new NotFoundException("그룹");
        }

        return findGroups;
    }

    public Group findById(Long groupId) {
        Optional<Group> findGroup = groupRepository.findById(groupId);
        if (findGroup.isEmpty()) {
            throw new NotFoundException("그룹");
        }

        return findGroup.get();
    }

    public Group createGroup(Group group, User leader) {
        group.setLeader(leader);
        group.setStatus(Status.WAIT);
        group.setRemainingCapacity(group.getMaxCapacity() - 1);

        return groupRepository.saveAndFlush(group);
    }

     public void createHistory(GroupHistory groupHistory) {
        groupHistoryRepository.saveAndFlush(groupHistory);
    }

    public void validateApproveKey(Group group, String approveKey) {
        if (group.getStatus() != Status.ACCEPT || !group.getApproveKey().equals(approveKey)) {
            throw new ValidateException("인증키가 유효하지 않음");
        }
    }

    public String generateKey() {
        StringBuilder key = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            boolean isNumber = random.nextBoolean();

            int origin = isNumber ? '0' : 'A';
            int bound = (isNumber ? '9' : 'Z') + 1;

            key.append((char) random.nextInt(origin, bound));
        }

        return key.toString();
    }

    public List<Group> searchByKey(String key, String value) {
        List<Group> groups = null;
        switch (key) {
            case "title":
                groups = groupRepository.findByTitleContaining(value);
                break;
            case "leader":
                groups = groupRepository.findByLeaderContaining(value);
                break;
        }

        if (groups == null || groups.isEmpty()) {
            throw new NotFoundException("그룹");
        }

        return groups;
    }

    public void createJoin(Group group, User user) {
        GroupUser groupUser = new GroupUser(group, user);
        groupUser.setLeader(false);

        groupUserRepository.saveAndFlush(groupUser);
        group.setRemainingCapacity(group.getRemainingCapacity() - 1);
    }

    public void cancelJoin(Group group, User user) {
        GroupUser groupUser = groupUserRepository.findByGroupAndUser(group, user);
        if (groupUser == null) {
            throw new NotFoundException("모임 참가자");
        }

        if (groupUser.isLeader()) {
            groupRepository.delete(group);
            return;
        }

        groupUserRepository.delete(groupUser);
        group.setRemainingCapacity(group.getRemainingCapacity() + 1);
        groupRepository.saveAndFlush(group);
    }

    public Status convertToStatusType(String status) {
        switch (status) {
            case "wait":
                return Status.WAIT;
            case "reject":
                return Status.REJECT;
            default:
                return Status.ACCEPT;
        }
    }

    public void updateGroup(Group original, Group modified) {
        original.setTitle(modified.getTitle());
        original.setDescription(modified.getDescription());
        original.setFilePath(modified.getFilePath());
        groupRepository.saveAndFlush(original);
    }

    public GroupUser findByGroupIdAndUserId(Long groupId, Long userId) {
        return groupUserRepository.findByGroupIdAndUserId(groupId, userId);
    }
}
