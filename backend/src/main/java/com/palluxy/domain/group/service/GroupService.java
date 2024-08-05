package com.palluxy.domain.group.service;

import com.palluxy.domain.group.dto.GroupRequest;
import com.palluxy.domain.group.dto.GroupResponses;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.dto.Status;
import com.palluxy.domain.group.entity.GroupUser;
import org.springframework.data.domain.Pageable;

public interface GroupService {

    GroupResponses findByStatus(Status status, Pageable pageable);

    GroupResponses findAvailableGroups(Pageable pageable);

    Group findById(Long groupId);

    GroupResponses searchByKey(String key, String value, Pageable pageable);

    void createGroup(GroupRequest groupRequest, String filePath);

    Group approveGroup(Long groupId);

    void rejectGroup(Long groupId);

    void updateGroupInfo(Long groupId, GroupRequest groupRequest);

    void createJoin(Long groupId, Long userId);

    void cancelJoin(Long groupId, Long userId);

    GroupResponses findGroupsByUserId(Long userId, Pageable pageable);

    String getUserEmail(Long userId);

    void validateApproveKey(Group group, String approveKey);

    void validateUser(GroupUser groupUser);
}
