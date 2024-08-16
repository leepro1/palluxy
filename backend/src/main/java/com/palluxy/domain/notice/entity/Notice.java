package com.palluxy.domain.notice.entity;

import com.palluxy.domain.notice.dto.NoticeRequest;
import com.palluxy.global.common.data.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public Notice(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public static Notice of(NoticeRequest noticeRequest) {
        return Notice.builder()
            .title(noticeRequest.title())
            .content(noticeRequest.content())
            .build();
    }

    public void updateInfo(NoticeRequest noticeRequest) {
        this.title = noticeRequest.title();
        this.content = noticeRequest.content();
    }
}
