package com.palluxy.domain.group.repository;

import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.GroupUser;
import com.palluxy.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupUserRepository extends JpaRepository<GroupUser, Long> {

    Optional<GroupUser> findByGroupIdAndUserId(Long groupId, Long userId);
}
