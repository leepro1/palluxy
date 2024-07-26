package com.palluxy.domain.group.repository;

import com.palluxy.domain.group.entity.GroupHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupHistoryRepository extends JpaRepository<GroupHistory, Long> {}
