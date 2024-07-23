package com.palluxy.domain.letter.dto;

import lombok.Getter;

@Getter
public class LetterRequest {
  Long userId;
  Long petId;
  String title;
  String content;
}
