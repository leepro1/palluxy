package com.palluxy.domain.letter.util;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.palluxy.domain.letter.dto.AIRequest;
import com.palluxy.domain.letter.dto.Writer;
import com.palluxy.domain.letter.dto.ai.ClaudeRequest;
import com.palluxy.domain.letter.dto.ai.ClaudeResponse;
import com.palluxy.domain.letter.dto.ai.ClaudeRole;
import com.palluxy.domain.letter.dto.ai.ClaudeMessageInput;
import com.palluxy.domain.letter.entity.Letter;
import com.palluxy.domain.letter.repository.LetterRepository;
import com.palluxy.domain.letter.service.LetterService;
import java.util.ArrayList;
import java.util.List;
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

  private String prompt =
      """
                우리는 반려동물을 잃은 주인들의 펫로스 증후군을 케어하기 위한 서비스를 개발하고 있습니다. 
                이 서비스의 컨셉은, 별이 된 동물들이 모여 사는 '팰럭시'라는 행성에서 지구에 있는 주인에게 편지를 보내는 것입니다.

                주인이 반려동물에게 편지를 썼을 때, 
                우리가 넘겨주는 반려동물에 대한 데이터를 기반으로 반려동물의 입장에서 답장을 작성해 주세요.
                단, 첫번째 편지는 반려동물이 팰럭시에 잘 도착했고 잘 지내고 있다는 내용으로 반려동물이 먼저 보내는 것입니다.

                반려동물의 편지 작성 가이드라인:

                1.반려동물의 성격과 팰럭시에서의 생활, 이전에 주고 받은 편지를 반영하여, 반려동물이 행복하게 지내고 있음을 표현합니다.
                2.주인의 죄책감을 덜어주기 위해, 뽀삐가 주인과의 추억을 소중히 여기고 있음을 강조합니다.
                3.반려동물의 입장에서 주인에 대한 사랑과 감사의 마음을 담아 진심 어린 메시지를 작성합니다.
                4.팰럭시라는 행성의 따뜻하고 평화로운 분위기를 전달하여, 주인에게 안도감을 줍니다.
                5.편지만 작성해서 답변해야합니다. 이외에 질문을 이해했다는 내용 등을 포함하지 않습니다.
          """;

  public void sendRequest(ClaudeRequest request, Long petId) {
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
          String content = response.getContent().get(0).getText();
          letterRepository.saveAndFlush(new Letter("편지가 도착했어요.", content, Writer.PET, petId));
        }
    );

  }

  public ClaudeRequest getRequest(List<Letter> letters) {
    ClaudeRequest claudeRequest = new ClaudeRequest();

    List<ClaudeMessageInput> messageInputs = new ArrayList<>();
    messageInputs.add(new ClaudeMessageInput(ClaudeRole.USER, prompt));
    for (int i = 0; i < letters.size(); i++) {
      Letter letter = letters.get(i);

      ClaudeRole role = ClaudeRole.USER;
      if (letter.getWriter().equals(Writer.PET)) {
        role = ClaudeRole.ASSISTANT;
      }

      String content = letter.getContent();
      if (i == letters.size() - 1) {
        String data = "반려동물의 데이터를 가져오는 것으로 수정이 필요함";
        content = String.format(
            "%s \n\n 답장 작성에 참고할 반려동물의 데이터는 다음과 같습니다. 아래의 데이터를 참고해서, 편지만을 작성해서 답변해주세요. \n\n %s",
            content, data);
      }

      messageInputs.add(new ClaudeMessageInput(role, content));
    }

    return claudeRequest;
  }
}
