package com.palluxy.domain.letter.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class LetterRequest {
  String title;
  String content;
}
