package com.palluxy.domain.group.repository;

import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.Status;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

  Page<Group> findByStatus(Status status, Pageable pageable);

  Page<Group> findByTitleContaining(String title, Pageable pageable);

  @Query(
      "SELECT g FROM Group g WHERE g.leader.id IN (SELECT u.id FROM User u WHERE u.nickname LIKE %:nickname%)")
  Page<Group> findByLeaderContaining(@Param("nickname") String nickname, Pageable pageable);

  @Query("SELECT g FROM Group g WHERE g.status = :status AND g.remainingCapacity > :remainingCapacity AND g.startTime > :startTime")
  Page<Group> findAvailableGroup(
      @Param("status") Status status,
      @Param("remainingCapacity") int remainingCapacity,
      @Param("startTime") LocalDateTime startTime,
      Pageable pageable);

  @Query("SELECT g FROM Group g JOIN g.groupUser gu WHERE gu.user.id = :userId")
  Page<Group> findGroupsByUserId(@Param("userId") Long userId, Pageable pageable);
}
