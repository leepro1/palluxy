package com.palluxy.domain.user.repository;

import com.palluxy.domain.user.entity.GroupUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupUserRepository extends JpaRepository<GroupUser, Long> {

}
