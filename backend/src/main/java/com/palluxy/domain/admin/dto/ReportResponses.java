package com.palluxy.domain.admin.dto;

import com.palluxy.domain.report.entity.Report;

import java.util.List;

public class ReportResponses <T extends Report> {
    List<T> reports;
    int totalReportCount;
}
