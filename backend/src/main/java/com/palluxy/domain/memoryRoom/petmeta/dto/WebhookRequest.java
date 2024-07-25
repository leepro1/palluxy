package com.palluxy.domain.memoryRoom.petmeta.dto;

import java.time.LocalDateTime;

public class WebhookRequest {

    private String eventType;
    private String eventData;
    private Long roomId;
    private Long petMetaId;
    private LocalDateTime timestamp;

    // 기본 생성자
    public WebhookRequest() {}

    // 모든 필드를 포함하는 생성자
    public WebhookRequest(String eventType, String eventData, Long roomId, Long petMetaId, LocalDateTime timestamp) {
        this.eventType = eventType;
        this.eventData = eventData;
        this.roomId = roomId;
        this.petMetaId = petMetaId;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEventData() {
        return eventData;
    }

    public void setEventData(String eventData) {
        this.eventData = eventData;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public Long getPetMetaId() {
        return petMetaId;
    }

    public void setPetMetaId(Long petMetaId) {
        this.petMetaId = petMetaId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "WebhookRequest{" +
            "eventType='" + eventType + '\'' +
            ", eventData='" + eventData + '\'' +
            ", roomId=" + roomId +
            ", petMetaId=" + petMetaId +
            ", timestamp=" + timestamp +
            '}';
    }
}
