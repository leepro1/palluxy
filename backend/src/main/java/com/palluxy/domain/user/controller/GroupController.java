package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.dto.GroupDto;
import com.palluxy.domain.user.entity.Group;
import com.palluxy.domain.user.exception.NotFoundException;
import com.palluxy.domain.user.service.GroupService;
import com.palluxy.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/group")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @GetMapping("")
    public CommonResponse<?> getGroups() {
        List<Group> findGroups = null;

        try {
            findGroups = groupService.findAllGroups();

            List<GroupDto> groupDtos = new ArrayList<>();
            for (Group group : findGroups) {
                groupDtos.add(new GroupDto(group));
            }
        } catch (NotFoundException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("모든 그룹이 정상적으로 조회됨", findGroups);
    }

    @GetMapping("/{groupId}")
    public CommonResponse<?> getGroupDetail(@PathVariable("groupId") Long groupId) {
        Group findGroup = null;

        try {
            findGroup = groupService.findById(groupId);
        } catch (NotFoundException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("해당 그룹이 정상적으로 조회됨", new GroupDto(findGroup));
    }

    @PostMapping("")
    public CommonResponse<?> createGroup(@RequestBody GroupDto group) {
        Group savedGroup = groupService.createGroup(group.convertToEntity());
        if (savedGroup == null) {
            return CommonResponse.badRequest("그룹이 생성되지 않았음");
        }

        return CommonResponse.ok("정상적으로 그룹이 생성되었음", savedGroup.getId());
    }

    @PatchMapping("/{groupId}")
    public CommonResponse<?> updateGroup(@PathVariable("groupId") Long groupId) {
        return null;
    }

    @PostMapping("/join/{groupId}")
    public CommonResponse<?> createJoin(@PathVariable("groupId") Long groupId) {
        return null;
    }

    @DeleteMapping("/join/{groupId}")
    public CommonResponse<?> cancelJoin(@PathVariable("groupId") Long groupId) {
        return null;
    }
}
