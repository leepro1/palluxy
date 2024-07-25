package com.palluxy.domain.user.entity;

import com.palluxy.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "user")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, updatable = false)
    private String email;

    @Column(unique = true, length = 30)
    private String nickname;

    private String password;

    private boolean isAdmin;

    private boolean isBanned;

    private boolean acceptedTerms;

    private LocalDateTime acceptedTermsAt;

    @Builder
    public User(String email, String nickname, String password, boolean isAdmin, boolean acceptedTerms) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.isAdmin = isAdmin;
        this.acceptedTerms = acceptedTerms;
        this.acceptedTermsAt = LocalDateTime.now();
    }

}
