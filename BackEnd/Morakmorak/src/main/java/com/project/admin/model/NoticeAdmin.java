package com.project.admin.model;

import java.sql.Date;
import java.time.LocalDateTime;

import lombok.Data;
@Data
public class NoticeAdmin {
	private Long noticeNo;
    private String noticeTitle;
    private String content;
    private Date regDate;
}
