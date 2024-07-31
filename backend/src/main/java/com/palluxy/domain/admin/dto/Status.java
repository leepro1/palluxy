package com.palluxy.domain.admin.dto;

import com.palluxy.global.common.error.NotFoundException;

public enum Status {
  WAIT,
  ACCEPT,
  REJECT,
  CANCEL;

  public static Status of(String status) {
    switch (status) {
      case "wait":
        return Status.WAIT;
      case "accept":
        return Status.ACCEPT;
      case "reject":
        return Status.REJECT;
      case "cancel":
        return Status.CANCEL;
      default:
        throw new NotFoundException(status);
    }
  }
}
