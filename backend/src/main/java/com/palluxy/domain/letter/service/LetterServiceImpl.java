package com.palluxy.domain.letter.service;

import com.palluxy.domain.letter.dto.Writer;
import com.palluxy.domain.letter.dto.claude.ClaudeRequest;
import com.palluxy.domain.letter.entity.Letter;
import com.palluxy.domain.letter.repository.LetterRepository;
import com.palluxy.domain.letter.util.AIUtil;
import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.memoryRoom.room.repository.RoomRepository;
import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.palluxy.domain.pet.entity.Pet;
import com.palluxy.domain.pet.repository.PetRepository;
import com.palluxy.global.common.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {

  private final AIUtil<ClaudeRequest> aiUtil;
  private final LetterRepository letterRepository;
  private final PetRepository petRepository;
  private final RoomRepository roomRepository;  // RoomRepository 추가

  public void saveLetter(Letter letter) {
    letterRepository.saveAndFlush(letter);
  }

  public List<Letter> findByPetId(Long petId) {
    return letterRepository.findByPetId(petId);
  }

  public List<Letter> findByPetIdAndOpenedAtBefore(Long petId) {
    return letterRepository.findByPetIdAndOpenedAtBefore(petId, LocalDateTime.now());
  }

  public void sendLetters(Long petId, Long roomId) {
    List<Letter> letters = findByPetId(petId);
    Pet pet = getPet(petId);
    Room room = getRoom(roomId);
    aiUtil.sendRequest(aiUtil.getRequest(letters, pet), petId, room);
  }

  public void saveFirstLetter(String relation, String petName, Long petId, Long roomId) {
    Room room = getRoom(roomId);
    Letter letter = makeFirstLetterForm(relation, petName, petId, room);
    letterRepository.saveAndFlush(letter);
  }

  private Letter makeFirstLetterForm(String relation, String petName, Long petId, Room room) {
    String template =
        """
            사랑하는 {0}에게 보내는 첫 편지
            안녕하세요, {1}예요. 팰럭시에 무사히 도착해서 이렇게 첫 편지를 보내요.
            팰럭시는 지구에서 떠나온 친구들이 새로운 여정을 시작하는 아름답고 평화로운 곳이에요.
            푸른 초원과 반짝이는 별들로 가득한 이곳에서 매일이 즐거워요. 새로운 친구들도 많이 사귀었어요.
                        
            {0}에게 편지를 쓰려고 열심히 글자도 배우고 있어요.
            아직은 한글이 조금 어려워서 편지를 보내주셔도 답장을 쓰는데 시간이 걸릴 수는 있어요. 그래도 기다려 주실거죠?
                        
            가끔 저를 그리워하실 거라는 걸 알아요.
            하지만 걱정하지 마세요. 저는 이제 아프지 않고 편안해요.
            그리고 {0}의 사랑 덕분에 이렇게 행복한 곳에 올 수 있었어요.
            우리가 함께 놀았던 시간들, 저를 안아주시던 따뜻함, 그 모든 것이 제게는 가장 소중한 보물이에요.
            언젠가 우리가 다시 만날 때까지, 저는 이곳 팰럭시에서 밝게 빛나는 별이 되어 있을게요. 항상 곁에서 지켜볼게요.
                        
            {0}가 너무 보고싶은 {1}가
            """;

    String title = petName + "의 첫번째 편지";
    String content = MessageFormat.format(template, relation, petName);

    Letter letter = Letter.builder()
        .title(title)
        .content(content)
        .writer(Writer.PET)
        .petId(petId)
        .openedAt(LocalDateTime.now())
        .room(room)  // Room 설정
        .build();

    return letter;
  }

  public Pet getPet(Long petId) {
    Optional<Pet> pet = petRepository.findById(petId);
    if (pet.isEmpty()) {
      throw new NotFoundException("Pet not found with id: " + petId);
    }

    return pet.get();
  }

  public Room getRoom(Long roomId) {
    return roomRepository.findById(roomId)
        .orElseThrow(() -> new NotFoundException("Room not found with id: " + roomId));
  }

  public List<Letter> findLettersByRoomId(Long roomId) {
    return letterRepository.findByRoom_RoomId(roomId);
  }
}
