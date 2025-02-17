package com.project.visitlog.model;


import java.time.LocalDateTime;

import lombok.Data;

@Data
public class VisitLog {
	public VisitLog(String ipAddress2, String url2, LocalDateTime visitTime2) {
		this.ip = ipAddress2;
        this.url = url2;
        this.visitTime = visitTime2;
	}
	private Long id;
    private String ip;
    private LocalDateTime visitTime;
    private String url;
}
