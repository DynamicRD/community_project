package com.project.admin.model;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class FaqAdmin {
	private Long id;
	private String question;
	private String answer;
	private LocalDateTime createdAt;
}
