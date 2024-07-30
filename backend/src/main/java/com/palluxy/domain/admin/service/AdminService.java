package com.palluxy.domain.admin.service;

import com.palluxy.domain.group.entity.Group;
import com.palluxy.global.common.error.NotFoundException;
import com.palluxy.global.common.data.Status;
import com.palluxy.domain.group.repository.GroupRepository;
import com.palluxy.domain.user.entity.User;
import com.palluxy.domain.user.repository.UserRepository;
import com.palluxy.global.common.data.Status;
import com.palluxy.global.common.error.NotFoundException;
import java.util.Optional;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

  private final GroupRepository groupRepository;
  private final Random random = new Random();
  private final UserRepository userRepository;

  public Group approveGroup(Long groupId) {
    Group group = getGroup(groupId);
    String key = generateKey();
    updateGroup(group, Status.ACCEPT, key);

    return group;
  }

  public void rejectGroup(Long groupId) {
    Group group = getGroup(groupId);
    updateGroup(group, Status.REJECT, "");
  }

  public void updateGroup(Group group, Status status, String key) {
    group.setStatus(status);
    if (status == Status.ACCEPT) {
      group.updateApproveKey(key);
    }
    groupRepository.saveAndFlush(group);
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

  private Group getGroup(Long groupId) {
    Optional<Group> group = groupRepository.findById(groupId);
    if (!group.isPresent()) {
      throw new NotFoundException("Group");
    }

    return group.get();
  }

  public String getUserEmail(Long userId) {
    Optional<User> user = userRepository.findById(userId);
    if (!user.isPresent()) {
      throw new NotFoundException("User");
    }

    return user.get().getEmail();
  }
}
