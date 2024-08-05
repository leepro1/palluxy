package com.palluxy.domain.group.controller;

import com.palluxy.domain.group.dto.GroupRequest;
import com.palluxy.domain.group.dto.GroupResponse;
import com.palluxy.domain.group.dto.GroupResponses;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.service.GroupService;
import com.palluxy.global.common.data.CommonResponse;
import com.palluxy.domain.group.dto.Status;
import com.palluxy.global.config.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/group")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final FileStorageService fileStorageService;

    @GetMapping("/{status}/{page}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> getGroupsByStatus(@PathVariable("status") String status,
        @PathVariable("page") int page) {
        Status statusEnum = Status.of(status);
        Pageable pageable = PageRequest.of(page, 9);
        GroupResponses groups = groupService.findByStatus(statusEnum, pageable);
        return CommonResponse.ok("모든 그룹이 정상적으로 조회됨", groups);
    }

    @GetMapping("/available/{page}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> getAvailableGroups(@PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 9);
        GroupResponses groups = groupService.findAvailableGroups(pageable);
        return CommonResponse.ok("모든 그룹이 정상적으로 조회됨", groups);
    }

    @GetMapping("/detail/{groupId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> getGroupDetail(@PathVariable("groupId") Long groupId) {
        Group group = groupService.findById(groupId);
        return CommonResponse.ok("해당 그룹이 정상적으로 조회됨", GroupResponse.of(group));
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> searchGroup(@RequestParam int page, @RequestParam String key,
        @RequestParam String value) {
        Pageable pageable = PageRequest.of(page, 9);
        GroupResponses groups = groupService.searchByKey(key, value, pageable);
        return CommonResponse.ok("정상적으로 검색되었습니다.", groups);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<?> createGroup(@ModelAttribute GroupRequest groupRequest) {

        if (groupRequest.file() != null) {
            try {
                String folderName = "groups/";
                String fileName = fileStorageService.storeFile(groupRequest.file(), folderName);
                String filePath = fileStorageService.getFileUrl(fileName);
                groupService.createGroup(groupRequest, filePath);
            } catch (Exception e) {
                return CommonResponse.badRequest("Failed to create group");
            }
        } else {
            groupService.createGroup(groupRequest, null);
        }

        return CommonResponse.created("정상적으로 그룹이 생성되었음");
    }

    @PatchMapping("/detail/{groupId}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> updateGroup(
        @PathVariable("groupId") Long groupId, @RequestBody GroupRequest groupRequest) {
        groupService.updateGroupInfo(groupId, groupRequest);

        return CommonResponse.ok("정상적으로 수정이 반영 되었음");
    }

    @PostMapping("/detail/{groupId}/join")
    @ResponseStatus(HttpStatus.CREATED)
    public CommonResponse<?> createJoin(
        @PathVariable("groupId") Long groupId, @RequestBody GroupRequest groupRequest) {
        groupService.createJoin(groupId, groupRequest.userId());
        return CommonResponse.created("모임 참가 신청 완료");
    }

    @DeleteMapping("/detail/{groupId}/join")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> cancelJoin(
        @PathVariable("groupId") Long groupId, @RequestBody GroupRequest groupRequest) {
        groupService.cancelJoin(groupId, groupRequest.userId());
        return CommonResponse.ok("모임 참가 신청 취소 완료");
    }

    @GetMapping("/my/{userId}/{page}")
    @ResponseStatus(HttpStatus.OK)
    public CommonResponse<?> getMyGroups(@PathVariable("userId") Long userId,
        @PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, 9);
        GroupResponses groups = groupService.findGroupsByUserId(userId, pageable);
        return CommonResponse.ok("정상적으로 조회되었습니다.", groups);
    }
}