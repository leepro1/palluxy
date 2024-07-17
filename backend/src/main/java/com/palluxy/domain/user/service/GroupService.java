package com.palluxy.domain.user.service;

import com.palluxy.domain.user.entity.Group;
import com.palluxy.domain.user.entity.GroupHistory;
import com.palluxy.domain.user.entity.GroupUser;
import com.palluxy.domain.user.exception.NotFoundException;
import com.palluxy.domain.user.exception.ValidateException;
import com.palluxy.domain.user.repository.GroupHistoryRepository;
import com.palluxy.domain.user.repository.GroupRepository;
import com.palluxy.domain.user.repository.GroupUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final GroupUserRepository groupUserRepository;
    private final GroupHistoryRepository groupHistoryRepository;

    public List<Group> findAllGroups() {
        List<Group> findGroups =  groupRepository.findAll();
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

    public Group createGroup(Group group) {
        return groupRepository.saveAndFlush(group);
    }

    public GroupUser createGroupUser(GroupUser groupUser) {
        return groupUserRepository.saveAndFlush(groupUser);
    }

    public void createHistory(GroupHistory groupHistory) {
        groupHistoryRepository.saveAndFlush(groupHistory);
    }

    public void validateApproveKey(Group group, String approveKey) {
        if (!group.isApproved() || !group.getApproveKey().equals(approveKey)) {
            throw new ValidateException("인증키가 유효하지 않음");
        }
    }
}
