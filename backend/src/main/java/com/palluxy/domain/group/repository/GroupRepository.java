package com.palluxy.domain.group.repository;

import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.dto.Status;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    Page<Group> findByStatus(Status status, Pageable pageable);

    Page<Group> findByTitleContaining(String title, Pageable pageable);

    @Query(
        "SELECT g FROM Group g WHERE g.leader.id IN (SELECT u.id FROM User u WHERE u.nickname LIKE %:nickname%)")
    Page<Group> findByLeaderContaining(@Param("nickname") String nickname, Pageable pageable);

    @Query("SELECT g FROM Group g WHERE g.status = 'ACCEPT' AND g.remainingCapacity > 0 AND g.startTime >= CURRENT_TIMESTAMP")
    Page<Group> findAvailableGroup(Pageable pageable);

    @Query("SELECT g FROM Group g JOIN g.groupUser gu WHERE gu.user.id = :userId")
    Page<Group> findGroupsByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT g FROM Group g JOIN g.groupUser gu WHERE gu.user.id = :userId AND g.status = 'ACCEPT' AND g.startTime <= CURRENT_TIMESTAMP AND g.endTime >= CURRENT_TIMESTAMP ORDER BY g.startTime ASC")
    List<Group> findAvailableGroupsByUserId(Long userId);
}
