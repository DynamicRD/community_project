package com.project.mypage.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class Notification {
	private int no;
	private String content;
	private String isRead;
	private LocalDate regDate;
}
