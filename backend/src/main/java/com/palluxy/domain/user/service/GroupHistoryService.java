package com.palluxy.domain.user.service;

import com.palluxy.domain.user.entity.GroupHistory;
import com.palluxy.domain.user.repository.GroupHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupHistoryService {

    private final GroupHistoryRepository groupHistoryRepository;

    public void createHistory(GroupHistory groupHistory) {
        groupHistoryRepository.saveAndFlush(groupHistory);
    }
}
