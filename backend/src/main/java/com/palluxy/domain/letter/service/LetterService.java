package com.palluxy.domain.letter.service;

import com.palluxy.domain.letter.dto.LetterResponse;
import com.palluxy.domain.letter.entity.Letter;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.pet.entity.Pet;

import java.util.List;

public interface LetterService {

    void saveLetter(Letter letter);

    List<LetterResponse> findByPetId(Long petId);

    List<LetterResponse> findByPetIdAndOpenedAtBefore(Long petId);

    void sendLetters(Long petId, Long roomId);

    void saveFirstLetter(String relation, String petName, Long petId, Long roomId);

    Pet getPet(Long petId);

    Room getRoom(Long roomId);

    List<LetterResponse> findLettersByRoomIdAndOpenedAtBefore(Long roomId);
}
