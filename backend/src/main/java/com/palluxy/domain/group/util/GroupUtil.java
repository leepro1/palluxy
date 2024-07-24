package com.palluxy.domain.group.util;

import com.palluxy.domain.group.dto.GroupResponse;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.GroupUser;
import com.palluxy.domain.group.entity.Status;
import com.palluxy.domain.group.exception.ValidateException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class GroupUtil {

  private final Random random = new Random();

  public Status convertToStatusType(String status) {
    switch (status) {
      case "wait":
        return Status.WAIT;
      case "reject":
        return Status.REJECT;
      case "accept":
        return Status.ACCEPT;
      default:
        throw new ValidateException("유효하지 않은 status 값");
    }
  }

  public List<GroupResponse> convertToDtoList(List<Group> groups) {
    List<GroupResponse> result = new ArrayList<>();
    for (Group group : groups) {
      result.add(convertToDto(group));
    }

    return result;
  }

  public GroupResponse convertToDto(Group group) {
    return new GroupResponse(
        group.getId(),
        group.getLeader().getId(),
        group.getTitle(),
        group.getDescription(),
        group.getFilePath(),
        group.getStartTime(),
        group.getEndTime(),
        group.getMaxCapacity(),
        group.getRemainingCapacity());
  }

  public Group of(GroupResponse group) {
    return new Group(
        group.getId(),
        group.getTitle(),
        group.getDescription(),
        group.getFilePath(),
        group.getStartTime(),
        group.getEndTime(),
        group.getMaxCapacity(),
        group.getRemainingCapacity());
  }

  public String generateKey() {
    StringBuilder key = new StringBuilder();
    for (int i = 0; i < 6; i++) {
      boolean isNumber = random.nextBoolean();

      int origin = isNumber ? '0' : 'A';
      int bound = (isNumber ? '9' : 'Z') + 1;

      key.append((char) random.nextInt(origin, bound));
    }

    return key.toString();
  }

  public void validateApproveKey(Group group, String approveKey) {
    if (group.getStatus() != Status.ACCEPT || !group.getApproveKey().equals(approveKey)) {
      throw new ValidateException("인증키가 유효하지 않음");
    }
  }

  public void validateUser(GroupUser groupUser) {
    if (groupUser.isBanned()) {
      throw new ValidateException("강퇴당한 유저는 재입장 할 수 없음");
    }
  }
}
