package com.palluxy.domain.letter.controller;

import com.palluxy.domain.letter.dto.claude.ClaudeRequest;
import com.palluxy.domain.letter.dto.claude.ClaudeRole;
import com.palluxy.domain.letter.dto.claude.MessageInput;
import com.palluxy.domain.letter.util.ClaudeUtil;
import com.palluxy.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/letter")
@RequiredArgsConstructor
public class ClaudeController {

  private final ClaudeUtil claudeUtil;

  @PostMapping
  public CommonResponse<?> getLetter() {
    ClaudeRequest claudeRequest = new ClaudeRequest();

    String content = """
        우리는 반려동물을 잃은 주인들의 펫로스 증후군을 케어하기 위한 서비스를 개발하고 있습니다. 이 서비스의 컨셉은, 별이 된 동물들이 모여 사는 '팰럭시'라는 행성에서 지구에 있는 주인에게 편지를 보내는 것입니다.
        
        다음은 반려동물에 대한 데이터입니다:
        
        -이름: 뽀삐
        -종: 강아지
        -주인과의 관계: 누나
        -성격: 소심하지만 다정하고, 얌전하며, 말을 잘 듣는다.
        -주인과의 만남: 2015년 2월
        -사망일: 2024년 6월
        
        이 정보를 가지고, 주인이 반려동물에게 다음과 같은 편지를 쓴다면, 반려동물의 입장에서 답장을 작성해 주세요.
        단, 첫번째 편지는 반려동물이 팰럭시에 잘 도착했고 잘 지내고 있다는 내용으로 반려동물이 먼저 보내는 것입니다.
        
        반려동물의 편지 작성 가이드라인:
        
        1.반려동물의 성격과 팰럭시에서의 생활을 반영하여, 반려동물이 행복하게 지내고 있음을 표현합니다.
        2.주인의 죄책감을 덜어주기 위해, 뽀삐가 주인과의 추억을 소중히 여기고 있음을 강조합니다.
        3.반려동물의 입장에서 주인에 대한 사랑과 감사의 마음을 담아 진심 어린 메시지를 작성합니다.
        4.팰럭시라는 행성의 따뜻하고 평화로운 분위기를 전달하여, 주인에게 안도감을 줍니다.
        5.편지만 작성해서 답변해야합니다. 이외에 질문을 이해했다는 내용 등을 포함하지 않습니다.
        """;
    MessageInput messageInput = new MessageInput(ClaudeRole.USER, content);

    List<MessageInput> messageInputs = new ArrayList<>();
    messageInputs.add(messageInput);

    claudeRequest.setMessageInputs(messageInputs);
    claudeUtil.sendRequest(claudeRequest);

    return CommonResponse.ok("정상적으로 편지가 전송되었음");
  }
}
