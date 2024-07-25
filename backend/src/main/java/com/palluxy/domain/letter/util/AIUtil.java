package com.palluxy.domain.letter.util;

import com.palluxy.domain.letter.dto.AIRequest;
import com.palluxy.domain.letter.entity.Letter;
import java.util.List;

public interface AIUtil<T extends AIRequest> {
  public T getRequest(List<Letter> letters);
  public void sendRequest(T request, Long petId);
}
