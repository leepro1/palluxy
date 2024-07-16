package com.palluxy.domain.user.service;

import com.palluxy.domain.user.dto.GroupDto;
import com.palluxy.domain.user.entity.Group;
import com.palluxy.domain.user.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;

    public List<GroupDto> findAllGroups() {
        List<Group> findGroups =  groupRepository.findAll();
        if (findGroups == null || findGroups.isEmpty()) {
            return null;
        }

        List<GroupDto> findGroupsDto = new ArrayList<>();
        for(Group group : findGroups) {
            findGroupsDto.add(new GroupDto(group));
        }

        return findGroupsDto;
    }

    public GroupDto findById(Long groupId) {
        Group findGroup = groupRepository.getReferenceById(groupId);
        if (findGroup == null) {
            return null;
        }

        return new GroupDto(findGroup);
    }

    public Group createGroup(GroupDto groupDto) {
        Group group = groupDto.convertToEntity();
        return groupRepository.saveAndFlush(group);
    }

    public boolean validateApproveKey(Long groupId, String approveKey) {
        Group findGroup = groupRepository.getReferenceById(groupId);
        if (findGroup == null || !findGroup.getApproveKey().equals(approveKey)) {
            return false;
        }

        return true;
    }
}
