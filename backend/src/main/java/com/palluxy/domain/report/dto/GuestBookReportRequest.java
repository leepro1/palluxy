package com.palluxy.domain.report.dto;

public record GuestBookReportRequest(
    String description,
    Long guestBookId,
    Long commentId,
    Long reportFrom,
    Long reportTo) {

}
