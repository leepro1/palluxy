package com.palluxy.domain.group.service;

import com.palluxy.domain.group.entity.GroupHistory;
import com.palluxy.domain.group.repository.GroupHistoryRepository;
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
