package com.project.admin.model;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class CommentAdmin {
	private Long id;
    private Long reviewId;
    private String writer;
    private String content;
    private LocalDateTime createdAt;
    private String status;
}
