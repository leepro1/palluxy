package com.palluxy.domain.letter.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
public class LetterRequest {
  private String title;
  private String content;
  private Long roomId;
}
