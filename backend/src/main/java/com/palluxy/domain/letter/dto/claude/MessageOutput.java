package com.palluxy.domain.letter.dto.claude;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MessageOutput {
  private String text;
  private String type;
}
