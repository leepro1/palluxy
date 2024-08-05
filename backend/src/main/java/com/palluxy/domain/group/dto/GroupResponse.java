package com.palluxy.domain.group.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.palluxy.domain.group.entity.Group;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.palluxy.domain.group.entity.GroupUser;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Builder
public record GroupResponse(
    Long id,
    Long leaderId,
    String leaderNickname,
    String title,
    String description,
    String filePath,
    LocalDateTime startTime,
    LocalDateTime endTime,
    int maxCapacity,
    int remainCapacity,
    List<Long> groupUserId) {

    public static GroupResponse of(Group group) {
        List<Long> groupUserIds = new ArrayList<>();
        for (GroupUser user : group.getGroupUser()) {
            groupUserIds.add(user.getUser().getId());
        }

        return GroupResponse.builder()
            .id(group.getId())
            .leaderId(group.getLeader().getId())
            .leaderNickname(group.getLeader().getNickname())
            .title(group.getTitle())
            .description(group.getDescription())
            .filePath(group.getFilePath())
            .startTime(group.getStartTime())
            .endTime(group.getEndTime())
            .maxCapacity(group.getMaxCapacity())
            .remainCapacity(group.getRemainingCapacity())
            .groupUserId(groupUserIds)
            .build();

    }
}
