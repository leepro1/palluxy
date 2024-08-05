package com.palluxy.domain.report.dto;

import com.palluxy.domain.report.entity.Report;

import java.util.List;

public class ReportResponses<T extends Report> {

    List<T> reports;
    int totalReportCount;

    public ReportResponses() {
    }

    public ReportResponses(List<T> reports, int totalReportCount) {
        this.reports = reports;
        this.totalReportCount = totalReportCount;
    }
}
