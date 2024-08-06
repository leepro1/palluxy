package com.palluxy.domain.report.dto;

public record RoomReportRequest(
    String description,
    Long reportFrom,
    Long reportTo,
    Long roomId) {

}
