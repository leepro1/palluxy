package com.palluxy.domain.user.controller;

import com.palluxy.domain.user.dto.GroupDto;
import com.palluxy.domain.user.entity.Group;
import com.palluxy.domain.user.entity.Status;
import com.palluxy.domain.user.entity.User;
import com.palluxy.domain.user.exception.NotFoundException;
import com.palluxy.domain.user.service.GroupService;
import com.palluxy.domain.user.service.UserService;
import com.palluxy.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/group")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final UserService userService;

    @GetMapping("/{status}")
    public CommonResponse<?> getGroupsByStatus(@PathVariable("status") String status) {
        List<GroupDto> groupDtoList = null;
        Status statusEnum = groupService.convertToStatusType(status);

        try {
            List<Group> findGroups = groupService.findByStatus(statusEnum);

            groupDtoList = new ArrayList<>();
            for (Group group : findGroups) {
                groupDtoList.add(new GroupDto(group));
            }
        } catch (NotFoundException e) {
            return CommonResponse.ok(e.getMessage());
        }

        return CommonResponse.ok("모든 그룹이 정상적으로 조회됨", groupDtoList);
    }

    @GetMapping("/detail/{groupId}")
    public CommonResponse<?> getGroupDetail(@PathVariable("groupId") Long groupId) {
        Group findGroup = null;

        try {
            findGroup = groupService.findById(groupId);
        } catch (NotFoundException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("해당 그룹이 정상적으로 조회됨", new GroupDto(findGroup));
    }

    @GetMapping("/search")
    public CommonResponse<?> searchGroup(@RequestParam String key, @RequestParam String value) {
        List<GroupDto> groupDtoList = new ArrayList<>();

        try{
            List<Group> groups = groupService.searchByKey(key, value);
            for (Group group : groups) {
                groupDtoList.add(new GroupDto(group));
            }
        } catch (NotFoundException e) {
            return CommonResponse.ok(e.getMessage());
        }

        return CommonResponse.ok("정상적으로 검색되었습니다.", groupDtoList);
    }

    @PostMapping("")
    public CommonResponse<?> createGroup(@RequestBody Group group, @RequestBody Long userId) {
        try {
            User leader = null;
            groupService.createGroup(group, leader);
        } catch (NotFoundException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("정상적으로 그룹이 생성되었음");
    }

    @PatchMapping("detail/{groupId}")
    public CommonResponse<?> updateGroup(@PathVariable("groupId") Long groupId, @RequestBody Group modified) {
        try{
            Group original = groupService.findById(groupId);
            groupService.updateGroup(original, modified);
        } catch (NotFoundException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("정상적으로 수정이 반영 되었음");
    }

    @PostMapping("detail/{groupId}/join")
    public CommonResponse<?> createJoin(@PathVariable("groupId") Long groupId, @RequestBody Long userId) {
        try {
            Group findGroup = groupService.findById(groupId);
            // 유저 로직 수정 필요
            User user = null;
            groupService.createJoin(findGroup, user);
        } catch (NotFoundException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("모임 참가 신청 완료");
    }

    @DeleteMapping("detail/{groupId}/join")
    public CommonResponse<?> cancelJoin(@PathVariable("groupId") Long groupId, @RequestBody Long userId) {
        try {
            Group findGroup = groupService.findById(groupId);
            // 유저 로직 수정 필요
            User user = null;
            groupService.cancelJoin(findGroup, user);
        } catch (NotFoundException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("모임 참가 신청 취소 완료");
    }
}
