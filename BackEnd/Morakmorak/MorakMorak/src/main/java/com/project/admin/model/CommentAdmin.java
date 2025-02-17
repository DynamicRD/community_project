package com.project.admin.model;

import java.sql.Date;
import java.time.LocalDateTime;

import lombok.Data;
@Data
public class CommentAdmin {
	private Long no;
    private Long commentsNo;
    private Long reviewNo;
    private String nickname;
    private String content;
    private Date regDate;
    private String isblacked;
    
    
}
