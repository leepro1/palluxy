package com.palluxy.domain.report.repository;

import com.palluxy.domain.group.dto.Status;
import com.palluxy.domain.report.entity.RoomReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomReportRepository extends JpaRepository<RoomReport, Long> {
    Page<RoomReport> findByStatus(Status status, Pageable pageable);
}
