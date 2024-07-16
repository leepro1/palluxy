package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.dto.GroupDto;
import com.palluxy.domain.user.entity.Group;
import com.palluxy.domain.user.service.GroupService;
import com.palluxy.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/group")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @GetMapping("")
    public CommonResponse<?> getGroups() {
        List<GroupDto> findGroups = groupService.findAllGroups();
        if (findGroups == null) {
            return CommonResponse.ok("현재 그룹이 존재하지 않음");
        }

        return CommonResponse.ok("모든 그룹이 정상적으로 조회됨", findGroups);
    }

    @GetMapping("/{groupId}")
    public CommonResponse<?> getGroupDetail(@PathVariable("groupId") Long groupId) {
        GroupDto findGroup = groupService.findById(groupId);
        if (findGroup == null) {
            return CommonResponse.badRequest("해당 그룹이 존재하지 않음");
        }

        return CommonResponse.ok("해당 그룹이 정상적으로 조회됨", findGroup);
    }

    @PostMapping("")
    public CommonResponse<?> createGroup(@RequestBody GroupDto group) {
        Group savedGroup = groupService.createGroup(group);
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
