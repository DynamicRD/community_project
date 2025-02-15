package com.project.announcements.model;

import java.util.Date;

import lombok.Data;

@Data
public class Notice {
	private int nId;
	private String nTitle;
	private String content;
	private Date regDate;
}
