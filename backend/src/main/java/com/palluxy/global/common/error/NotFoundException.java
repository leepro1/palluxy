package com.palluxy.global.common.error;

public class NotFoundException extends RuntimeException {
  public NotFoundException(String target) {
    super(target + " is not found.");
  }
}
