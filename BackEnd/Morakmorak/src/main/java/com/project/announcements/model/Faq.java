package com.project.announcements.model;

import java.util.Date;

import lombok.Data;

@Data
public class Faq {
	private int nId;
	private String fTitle;
	private String content;
	private Date regDate;
}
