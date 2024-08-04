package com.palluxy.domain.letter.util;

import com.palluxy.domain.letter.dto.AIRequest;
import com.palluxy.domain.letter.entity.Letter;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.pet.entity.Pet;

import java.util.List;

public interface AIUtil<T extends AIRequest> {
  public T getRequest(List<Letter> letters, Pet pet);
  public void sendRequest(T request, Long petId, Room room);
}
