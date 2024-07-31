package com.palluxy.domain.report.repository;

import com.palluxy.domain.report.entity.GuestBookReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestBookRepository extends JpaRepository<GuestBookReport, Long> {

}
