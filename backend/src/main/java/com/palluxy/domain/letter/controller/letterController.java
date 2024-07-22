package com.palluxy.domain.letter.controller;

import com.palluxy.domain.letter.dto.ClaudeRequest;
import com.palluxy.domain.letter.dto.ClaudeRole;
import com.palluxy.domain.letter.dto.MessageInput;
import com.palluxy.domain.letter.util.ClaudeUtil;
import com.palluxy.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/letter")
@RequiredArgsConstructor
public class letterController {

  private final ClaudeUtil claudeUtil;

  @GetMapping
  public CommonResponse<?> getLetter() {
    ClaudeRequest claudeRequest = new ClaudeRequest();
    MessageInput messageInput = new MessageInput();
    messageInput.setRole(ClaudeRole.USER);
    messageInput.setContent(
        """
        우리는 반려동물을 잃은 주인들의 펫로스 증후군을 케어하기 위한 서비스를 개발하고 있습니다. 이 서비스의 컨셉은, 별이 된 동물들이 모여 사는 '팰럭시'라는 행성에서 지구에 있는 주인에게 편지를 보내는 것입니다.
        
        다음은 반려동물에 대한 데이터입니다:
        
        -이름: 뽀삐
        -종: 강아지
        -주인과의 관계: 누나
        -성격: 소심하지만 다정하고, 얌전하며, 말을 잘 듣는다.
        -주인과의 만남: 2015년 2월
        -사망일: 2024년 6월
        
        이 정보를 가지고, 주인이 뽀삐에게 다음과 같은 편지를 쓴다면, 뽀삐의 입장에서 답장을 작성해 주세요.
        
        안녕 뽀삐야? 누나야. 뽀삐가 없는 날을 하늘도 슬퍼하는지 비가 많이 오고 있다. 거기서는 잘 지내? 너 마지막으로 가기 전에 좋아하는 개껌이라도 잔뜩 줄걸.. 그렇게 너가 떠나버릴지 몰랐어. 너무 미안해. 누나가 뽀삐 많이 보고싶어해. 사랑해.
        
        뽀삐의 답장 작성 가이드라인:
        
        뽀삐의 성격과 팰럭시에서의 생활을 반영하여, 뽀삐가 행복하게 지내고 있음을 표현합니다.
        주인의 죄책감을 덜어주기 위해, 뽀삐가 누나와의 추억을 소중히 여기고 있음을 강조합니다.
        뽀삐의 입장에서 누나에 대한 사랑과 감사의 마음을 담아 진심 어린 메시지를 작성합니다.
        팰럭시라는 행성의 따뜻하고 평화로운 분위기를 전달하여, 주인에게 안도감을 줍니다. 단 팰럭시에서 지내고 있는 것을 주인은 이미 알고 있습니다.
        """
    );
    claudeRequest.getMessageInputs().add(messageInput);
    String letter = claudeUtil.sendRequest(claudeRequest);

    return CommonResponse.ok(letter);
  }
}
