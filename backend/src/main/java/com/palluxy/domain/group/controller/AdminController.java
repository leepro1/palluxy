package com.palluxy.domain.group.controller;

import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.Status;
import com.palluxy.domain.group.exception.NotFoundException;
import com.palluxy.domain.group.service.GroupService;
import com.palluxy.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final GroupService groupService;

    @PatchMapping("/group/approve")
    public CommonResponse<?> approveGroup(@RequestBody Long groupId) {
        try {
            Group findGroup = groupService.findById(groupId);
            String key = groupService.generateKey();

            findGroup.setStatus(Status.ACCEPT);
            findGroup.setApproveKey(key);
        } catch (NotFoundException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("그룹이 정상적으로 승인되었음");
    }

    @PatchMapping("/group/reject")
    public CommonResponse<?> rejectGroup(@RequestBody Long groupId) {
        try {
            Group findGroup = groupService.findById(groupId);
            findGroup.setStatus(Status.REJECT);
        } catch (NotFoundException e) {
            return CommonResponse.badRequest(e.getMessage());
        }

        return CommonResponse.ok("그룹이 정상적으로 승인되었음");
    }
}
