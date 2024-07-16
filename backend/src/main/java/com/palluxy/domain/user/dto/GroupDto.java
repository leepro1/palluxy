package com.palluxy.domain.user.dto;

import com.palluxy.domain.user.entity.Group;
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

    public GroupDto(Group group) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.filePath = filePath;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Group convertToEntity() {
        Group group = new Group();
        group.setId(this.id);
        group.setTitle(this.title);
        group.setDescription(this.description);
        group.setFilePath(this.filePath);
        group.setStartTime(this.startTime);
        group.setEndTime(this.endTime);

        return group;
    }
}
