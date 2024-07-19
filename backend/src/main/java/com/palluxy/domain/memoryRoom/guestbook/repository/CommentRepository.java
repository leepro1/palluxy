package com.palluxy.domain.memoryRoom.guestbook.repository;

import com.palluxy.domain.memoryRoom.guestbook.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
