package com.palluxy.domain.user.repository;

import com.palluxy.domain.user.entity.Group;
import com.palluxy.domain.user.entity.GroupUser;
import com.palluxy.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupUserRepository extends JpaRepository<GroupUser, Long> {

    GroupUser findByGroupAndUser(Group group, User user);

    GroupUser findByGroupIdAndUserId(Long groupId, Long userId);
}
