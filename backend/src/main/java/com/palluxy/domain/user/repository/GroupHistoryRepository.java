package com.palluxy.domain.user.repository;

import com.palluxy.domain.user.entity.GroupHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupHistoryRepository extends JpaRepository<GroupHistory, Long> {

}
