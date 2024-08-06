package com.palluxy.domain.user.repository;

import com.palluxy.domain.user.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByNickname(String nickname);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.password = :password WHERE u.email = :email")
    int updatePasswordByEmail(@Param("email") String email, @Param("password") String password);
}