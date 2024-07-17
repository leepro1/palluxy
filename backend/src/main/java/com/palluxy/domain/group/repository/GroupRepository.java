package com.palluxy.domain.group.repository;

import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long>{
    List<Group> findByStatus(Status status);
    List<Group> findByTitleContaining(String title);
    @Query("SELECT g FROM Group g WHERE g.leader.id IN (SELECT u.id FROM User u WHERE u.nickname LIKE %:nickname%)")
    List<Group> findByLeaderContaining(@Param("nickname") String nickname);
}
