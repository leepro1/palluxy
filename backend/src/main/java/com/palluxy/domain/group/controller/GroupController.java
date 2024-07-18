package com.palluxy.domain.group.controller;

import com.palluxy.domain.group.dto.GroupDto;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.Status;
import com.palluxy.domain.group.util.GroupUtil;
import com.palluxy.domain.user.entity.User;
import com.palluxy.domain.group.service.GroupService;
import com.palluxy.domain.user.service.UserService;
import com.palluxy.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final UserService userService;
    private final GroupUtil groupUtil;

    @GetMapping("/{status}")
    public CommonResponse<?> getGroupsByStatus(@PathVariable("status") String status) {
        Status statusEnum = groupUtil.convertToStatusType(status);
        List<GroupDto> groupDtoList = groupUtil.convertToDtoList(groupService.findByStatus(statusEnum));

        return CommonResponse.ok("모든 그룹이 정상적으로 조회됨", groupDtoList);
    }

    @GetMapping("/detail/{groupId}")
    public CommonResponse<?> getGroupDetail(@PathVariable("groupId") Long groupId) {
        GroupDto group = groupUtil.convertToDto(groupService.findById(groupId));
        return CommonResponse.ok("해당 그룹이 정상적으로 조회됨", group);
    }

    @GetMapping("/search")
    public CommonResponse<?> searchGroup(@RequestParam String key, @RequestParam String value) {
        List<GroupDto> groups = groupUtil.convertToDtoList(groupService.searchByKey(key, value));
        return CommonResponse.ok("정상적으로 검색되었습니다.", groups);
    }

    @PostMapping("")
    public CommonResponse<?> createGroup(@RequestBody Group group, @RequestBody Long userId) {
        // 유저 로직 수정 필요
        User leader = null;
        groupService.createGroup(group, leader);

        return CommonResponse.ok("정상적으로 그룹이 생성되었음");
    }

    @PatchMapping("detail/{groupId}")
    public CommonResponse<?> updateGroup(@PathVariable("groupId") Long groupId, @RequestBody Group modified) {
        Group original = groupService.findById(groupId);
        groupService.updateGroupByUser(original, modified);

        return CommonResponse.ok("정상적으로 수정이 반영 되었음");
    }

    @PostMapping("detail/{groupId}/join")
    public CommonResponse<?> createJoin(@PathVariable("groupId") Long groupId, @RequestBody Long userId) {
        Group findGroup = groupService.findById(groupId);
        // 유저 로직 수정 필요
        User user = null;
        groupService.createJoin(findGroup, user);

        return CommonResponse.ok("모임 참가 신청 완료");
    }

    @DeleteMapping("detail/{groupId}/join")
    public CommonResponse<?> cancelJoin(@PathVariable("groupId") Long groupId, @RequestBody Long userId) {
        groupService.cancelJoin(groupId, userId);
        return CommonResponse.ok("모임 참가 신청 취소 완료");
    }
}
