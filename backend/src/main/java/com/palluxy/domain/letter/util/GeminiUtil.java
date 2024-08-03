package com.palluxy.domain.letter.util;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.palluxy.domain.letter.dto.Writer;
import com.palluxy.domain.letter.dto.gemini.GeminiRequest;
import com.palluxy.domain.letter.dto.gemini.GeminiResponse;
import com.palluxy.domain.letter.entity.Letter;
import com.palluxy.domain.letter.repository.LetterRepository;
import com.palluxy.domain.pet.entity.Pet;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class GeminiUtil implements AIUtil<GeminiRequest> {

    @Value("${gemini.api.key}")
    private String API_KEY;
    @Value("${gemini.api.url}")
    private String API_URL;

    private final LetterRepository letterRepository;

    @Override
    public GeminiRequest getRequest(List<Letter> letters, Pet pet) {
        GeminiRequest request = new GeminiRequest();
        request.addContent(Prompt.getPrompt(), "user");
        for (int i = 0; i < letters.size(); i++) {
            Letter letter = letters.get(i);

            String role = letter.getWriter().equals(Writer.PET) ? "model" : "user";
            String content = letter.getContent();
            if (i == letters.size() - 1) {
                String data = pet.toString();
                content = String.format(
                        "%s \n\n 답장 작성에 참고할 반려동물의 데이터는 다음과 같습니다. 아래의 데이터를 참고해서, 편지만을 작성해서 답변해주세요. \n\n %s",
                        content, data);
            }
            request.addContent(content, role);
        }
        return request;
    }

        public void sendRequest(GeminiRequest request, Long petId) {
            JsonObject object = new JsonObject();

            JsonArray contents = new JsonArray();
            for (GeminiRequest.Content content : request.getContents()) {
                contents.add(content.toJsonObject());
            }
            object.add("contents", contents);

            String json = object.toString();

            WebClient webClient =
                    WebClient.builder()
                            .baseUrl(API_URL)
                            .defaultHeader("key", API_KEY)
                            .build();

            webClient.post().bodyValue(json).retrieve().bodyToMono(GeminiResponse.class).subscribe(
                    response -> {
                        String content = response.getText();
                        Letter letter = Letter.builder()
                                .title("편지가 도착했어요")
                                .content(content)
                                .writer(Writer.PET)
                                .petId(petId)
                                .openedAt(LocalDateTime.now().plusHours(6L))
                                .build();
                        letterRepository.saveAndFlush(letter);
                    }
            );
        }
}
