package com.palluxy.domain.group.util;

import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.GroupUser;
import com.palluxy.domain.group.entity.Status;
import com.palluxy.domain.group.exception.ValidateException;
import org.springframework.stereotype.Component;

@Component
public class GroupUtil {

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
