package com.palluxy.domain.notice.repository;

import com.palluxy.domain.notice.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    Page<Notice> findAllOrderByCreatedAt(Pageable pageable);
}
