package com.palluxy.domain.report.repository;

import com.palluxy.domain.report.entity.RoomReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomReportRepository extends JpaRepository<RoomReport, Long> {

}
