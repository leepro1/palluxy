package com.palluxy.domain.memoryRoom.petmeta.dto;

import lombok.Data;

@Data
public class WebhookRequest {
    private Long roomId;
    private String file;
}
