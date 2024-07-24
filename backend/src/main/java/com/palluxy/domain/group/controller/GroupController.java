package com.palluxy.domain.group.controller;

import com.palluxy.domain.group.dto.GroupResponse;
import com.palluxy.domain.group.dto.GroupRequest;
import com.palluxy.domain.group.dto.GroupResponses;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.Status;
import com.palluxy.domain.group.util.GroupUtil;
import com.palluxy.domain.group.service.GroupService;
import com.palluxy.global.common.CommonResponse;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group")
@RequiredArgsConstructor
public class GroupController {

  private final GroupService groupService;
  private final GroupUtil groupUtil;

  @GetMapping("/{status}/{page}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getGroupsByStatus(@PathVariable("status") String status,
      @PathVariable("page") int page) {
    Status statusEnum = groupUtil.convertToStatusType(status);
    Pageable pageable = PageRequest.of(page - 1, 9);
    Page<Group> groupPage = groupService.findByStatus(statusEnum, pageable);
    List<GroupResponse> groupList = groupUtil.convertToDtoList(groupPage.getContent());

    GroupResponses data = new GroupResponses(groupList, groupPage.getTotalElements());
    return CommonResponse.ok("모든 그룹이 정상적으로 조회됨", data);
  }

  @GetMapping("/detail/{groupId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> getGroupDetail(@PathVariable("groupId") Long groupId) {
    GroupResponse group = groupUtil.convertToDto(groupService.findById(groupId));
    return CommonResponse.ok("해당 그룹이 정상적으로 조회됨", group);
  }

  @GetMapping("/search")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> searchGroup(@RequestParam int page, @RequestParam String key,
      @RequestParam String value) {
    Pageable pageable = PageRequest.of(page - 1, 9);
    Page<Group> groupPage = groupService.searchByKey(key, value, pageable);
    List<GroupResponse> groupList = groupUtil.convertToDtoList(groupPage.getContent());
    return CommonResponse.ok("정상적으로 검색되었습니다.",
        new GroupResponses(groupList, groupPage.getTotalElements()));
  }

  @PostMapping("")
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<?> createGroup(@RequestBody GroupRequest groupRequest) {
    groupService.createGroup(groupRequest.getGroup(), groupRequest.getUserId());
    return CommonResponse.created("정상적으로 그룹이 생성되었음");
  }

  @PatchMapping("detail/{groupId}")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> updateGroup(
      @PathVariable("groupId") Long groupId, @RequestBody GroupRequest groupRequest) {
    Group group = groupService.findById(groupId);
    groupService.updateGroupByUser(group, groupRequest.getGroup());

    return CommonResponse.ok("정상적으로 수정이 반영 되었음");
  }

  @PostMapping("detail/{groupId}/join")
  @ResponseStatus(HttpStatus.CREATED)
  public CommonResponse<?> createJoin(
      @PathVariable("groupId") Long groupId, @RequestBody GroupRequest groupRequest) {
    groupService.createJoin(groupId, groupRequest.getUserId());
    return CommonResponse.created("모임 참가 신청 완료");
  }

  @DeleteMapping("detail/{groupId}/join")
  @ResponseStatus(HttpStatus.OK)
  public CommonResponse<?> cancelJoin(
      @PathVariable("groupId") Long groupId, @RequestBody GroupRequest groupRequest) {
    groupService.cancelJoin(groupId, groupRequest.getUserId());
    return CommonResponse.ok("모임 참가 신청 취소 완료");
  }
}
