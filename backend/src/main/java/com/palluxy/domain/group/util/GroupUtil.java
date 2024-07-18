package com.palluxy.domain.group.util;

import com.palluxy.domain.group.dto.GroupDto;
import com.palluxy.domain.group.entity.Group;
import com.palluxy.domain.group.entity.GroupUser;
import com.palluxy.domain.group.entity.Status;
import com.palluxy.domain.group.exception.ValidateException;
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
            default:
                return Status.ACCEPT;
        }
    }

    public List<GroupDto> convertToDtoList(List<Group> groups) {
        List<GroupDto> result = new ArrayList<>();
        for (Group group : groups) {
            result.add(convertToDto(group));
        }

        return result;
    }

    public GroupDto convertToDto(Group group) {
        return new GroupDto(group.getId(), group.getTitle(), group.getDescription(), group.getFilePath(),
                group.getStartTime(), group.getEndTime(), group.getMaxCapacity(), group.getRemainingCapacity());
    }

    public Group convertToEntity(GroupDto group) {
        return new Group(group.getId(), group.getTitle(), group.getDescription(), group.getFilePath(),
                group.getStartTime(), group.getEndTime(), group.getMaxCapacity(), group.getRemainingCapacity());
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
