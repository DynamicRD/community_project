package com.project.admin.model;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class NoticeAdmin {
	private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
}
