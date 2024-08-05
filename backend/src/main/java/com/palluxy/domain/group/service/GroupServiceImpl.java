package com.palluxy.domain.group.service;

import com.palluxy.domain.group.dto.GroupRequest;
import com.palluxy.domain.group.dto.GroupResponse;
import com.palluxy.domain.group.dto.GroupResponses;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.GroupUser;
import com.palluxy.domain.group.dto.Status;
import com.palluxy.domain.group.exception.ValidateException;
import com.palluxy.domain.user.entity.*;
import com.palluxy.global.common.error.NotFoundException;
import com.palluxy.domain.group.repository.GroupRepository;
import com.palluxy.domain.user.repository.UserRepository;

import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final GroupUserService groupUserService;
    private final UserRepository userRepository;
    private final Random random = new Random();

    public GroupResponses findByStatus(Status status, Pageable pageable) {
        Page<Group> groupPage = groupRepository.findByStatus(status, pageable);
        return getGroupResponses(groupPage);
    }

    public GroupResponses findAvailableGroups(Pageable pageable) {
        Page<Group> groupPage = groupRepository.findAvailableGroup(pageable);
        return getGroupResponses(groupPage);
    }

    public Group findById(Long groupId) {
        Optional<Group> findGroup = groupRepository.findById(groupId);
        if (findGroup.isEmpty()) {
            throw new NotFoundException("group");
        }

        return findGroup.get();
    }

    public GroupResponses findGroupsByUserId(Long userId, Pageable pageable) {
        Page<Group> groupPage = groupRepository.findGroupsByUserId(userId, pageable);
        return getGroupResponses(groupPage);
    }

    public GroupResponses searchByKey(String key, String value, Pageable pageable) {
        Page<Group> groupPage = null;
        switch (key) {
            case "title":
                groupPage = groupRepository.findByTitleContaining(value, pageable);
                break;
            case "leader":
                groupPage = groupRepository.findByLeaderContaining(value, pageable);
                break;
        }

        return getGroupResponses(groupPage);
    }

    public void createGroup(GroupRequest groupRequest, String filePath) {
        User leader = getUser(groupRequest.leaderId());

        Group group = Group.builder()
            .title(groupRequest.title())
            .description(groupRequest.description())
            .startTime(groupRequest.startTime())
            .endTime(groupRequest.endTime())
            .maxCapacity(groupRequest.maxCapacity())
            .remainingCapacity(groupRequest.maxCapacity() - 1)
            .leader(leader)
            .filePath(filePath)
            .build();

        group.updateStatus(Status.WAIT, null);
        groupRepository.saveAndFlush(group);
        groupUserService.createGroupUser(group, leader, true);
    }

    public void createJoin(Long groupId, Long userId) {
        Group group = findById(groupId);
        User user = getUser(userId);
        groupUserService.createGroupUser(group, user, false);

        group.updateCapacity(group.getRemainingCapacity() - 1);
        groupRepository.saveAndFlush(group);
    }

    public void cancelJoin(Long groupId, Long userId) {
        GroupUser groupUser = groupUserService.findByGroupIdAndUserId(groupId, userId);
        Group group = findById(groupId);
        if (groupUser.isLeader()) {
            group.updateStatus(Status.CANCEL, null);
            return;
        }

        groupUserService.delete(groupUser);
        group.updateCapacity(group.getRemainingCapacity() + 1);
        groupRepository.saveAndFlush(group);
    }

    public void updateGroupInfo(Long groupId, GroupRequest request) {
        Group group = findById(groupId);
        group.updateInfo(request.title(), request.description());
        groupRepository.saveAndFlush(group);
    }

    public Group approveGroup(Long groupId) {
        Group group = findById(groupId);
        String key = generateKey();
        updateGroupStatus(group, Status.ACCEPT, key);

        return group;
    }

    public void rejectGroup(Long groupId) {
        Group group = findById(groupId);
        updateGroupStatus(group, Status.REJECT, null);
    }

    public void updateGroupStatus(Group group, Status status, String key) {
        group.updateStatus(status, key);
        groupRepository.saveAndFlush(group);
    }

    private String generateKey() {
        StringBuilder key = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            boolean isNumber = random.nextBoolean();

            int origin = isNumber ? '0' : 'A';
            int bound = (isNumber ? '9' : 'Z') + 1;

            key.append((char) random.nextInt(origin, bound));
        }

        return key.toString();
    }

    private User getUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new NotFoundException("user");
        }

        return user.get();
    }

    public String getUserEmail(Long userId) {
        User user = getUser(userId);
        return user.getEmail();
    }

    public void validateApproveKey(Group group, String approveKey) {
        if (group.getStatus() != Status.ACCEPT || !group.getApproveKey().equals(approveKey)) {
            throw new ValidateException("인증키가 유효하지 않음");
        }
    }

    public void validateUser(GroupUser groupUser) {
        if (groupUser.isBanned()) {
            throw new ValidateException("강퇴당한 유저는 재입장 할 수 없음");
        }
    }

    public GroupResponses getGroupResponses(Page<Group> groupPage) {
        List<GroupResponse> groups = new ArrayList<>();
        for (Group group : groupPage) {
            groups.add(GroupResponse.of(group));
        }

        return new GroupResponses(groups, groupPage.getTotalElements());
    }
}