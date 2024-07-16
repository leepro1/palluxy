package com.palluxy.domain.user.service;

import com.palluxy.domain.user.entity.Group;
import com.palluxy.domain.user.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;

    public List<Group> findAllGroups() {
        return groupRepository.findAll();
    }

    public Group findById(Long groupId) {
        return groupRepository.getReferenceById(groupId);
    }

    public Group createGroup(Group group) {
        return groupRepository.saveAndFlush(group);
    }
}
