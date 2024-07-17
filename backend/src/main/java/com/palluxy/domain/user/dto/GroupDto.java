package com.palluxy.domain.user.dto;

import com.palluxy.domain.user.entity.Group;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GroupDto {
    private Long id;
    private String title;
    private String description;
    private String filePath;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int maxCapacity;
    private int remainingCapacity;

    public GroupDto() {}

    public GroupDto(Group group) {
        this.id = group.getId();
        this.title = group.getTitle();
        this.description = group.getDescription();
        this.filePath = group.getFilePath();
        this.startTime = group.getStartTime();
        this.endTime = group.getEndTime();
        this.maxCapacity = group.getMaxCapacity();
        this.remainingCapacity = group.getRemainingCapacity();
    }

    public Group convertToEntity() {
        Group group = new Group();
        group.setId(this.id);
        group.setTitle(this.title);
        group.setDescription(this.description);
        group.setFilePath(this.filePath);
        group.setStartTime(this.startTime);
        group.setEndTime(this.endTime);
        group.setMaxCapacity(this.maxCapacity);
        group.setRemainingCapacity(this.remainingCapacity);
        return group;
    }

}
