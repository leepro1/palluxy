package com.palluxy.domain.letter.util;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.palluxy.domain.letter.dto.Writer;
import com.palluxy.domain.letter.dto.claude.ClaudeRequest;
import com.palluxy.domain.letter.dto.claude.ClaudeResponse;
import com.palluxy.domain.letter.dto.claude.ClaudeRole;
import com.palluxy.domain.letter.dto.claude.ClaudeMessageInput;
import com.palluxy.domain.letter.entity.Letter;
import com.palluxy.domain.letter.repository.LetterRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.palluxy.domain.memoryRoom.room.entity.Room;
import com.palluxy.domain.pet.entity.Pet;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class ClaudeUtil implements AIUtil<ClaudeRequest> {

  @Value("${claude.api.key}")
  private String API_KEY;
  @Value("${claude.api.url}")
  private String API_URL;

  private final LetterRepository letterRepository;

  public void sendRequest(ClaudeRequest request, Long petId, Room room) {
    JsonObject object = new JsonObject();
    object.addProperty("model", request.getModel());
    object.addProperty("max_tokens", request.getMaxTokens());

    JsonArray messages = new JsonArray();
    for (ClaudeMessageInput messageInput : request.getMessageInputs()) {
      messages.add(messageInput.toJsonObject());
    }
    object.add("messages", messages);

    String json = object.toString();
    WebClient webClient =
        WebClient.builder()
            .baseUrl(API_URL)
            .defaultHeader("x-api-key", API_KEY)
            .defaultHeader("anthropic-version", "2023-06-01")
            .defaultHeader("content-type", "application/json")
            .build();

    webClient.post().bodyValue(json).retrieve().bodyToMono(ClaudeResponse.class).subscribe(
        response -> {
          String content = response.getText();
          Letter letter = Letter.builder()
              .title("편지가 도착했어요")
              .content(content)
              .writer(Writer.PET)
              .petId(petId)
                  .room(room)
              .openedAt(LocalDateTime.now().plusHours(6L))
              .build();
          letterRepository.saveAndFlush(letter);
        }
    );
  }

  public ClaudeRequest getRequest(List<Letter> letters, Pet pet) {
    ClaudeRequest claudeRequest = new ClaudeRequest();

    List<ClaudeMessageInput> messageInputs = new ArrayList<>();
    messageInputs.add(new ClaudeMessageInput(ClaudeRole.USER, Prompt.getPrompt()));
    for (int i = 0; i < letters.size(); i++) {
      Letter letter = letters.get(i);

      ClaudeRole role = ClaudeRole.USER;
      if (letter.getWriter().equals(Writer.PET)) {
        role = ClaudeRole.ASSISTANT;
      }

      String content = letter.getContent();
      if (i == letters.size() - 1) {
        String data = pet.toString();
        content = String.format(
            "%s \n\n 답장 작성에 참고할 반려동물의 데이터는 다음과 같습니다. 아래의 데이터를 참고해서, 편지만을 작성해서 답변해주세요. \n\n %s",
            content, data);
      }

      messageInputs.add(new ClaudeMessageInput(role, content));
    }

    claudeRequest.setMessageInputs(messageInputs);

    return claudeRequest;
  }
}
