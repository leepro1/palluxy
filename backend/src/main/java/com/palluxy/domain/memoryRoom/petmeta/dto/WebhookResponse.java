package com.palluxy.domain.memoryRoom.petmeta.dto;

import lombok.Data;

@Data
public class WebhookResponse {
    private WebhookResult result;  // result 필드로 감싸서 받음

    @Data
    public static class WebhookResult {
        private Long roomId;  // Django로부터 받은 roomId
        private String file;  // 파일 URL 또는 경로
    }
}
