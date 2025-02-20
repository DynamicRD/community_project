package com.project.visitlog.model;


import java.util.Date;

import lombok.Data;

@Data
public class VisitLog {
	public VisitLog(String ipAddress2, String url2, Date visitDate2) {
		this.ip = ipAddress2;
        this.url = url2;
        this.visitDate = visitDate2;
	}
	private Long id;
    private String ip;
    private Date visitDate;
    private String url;
}
