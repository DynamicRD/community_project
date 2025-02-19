package com.project.admin.model;

import java.sql.Date;
import java.time.LocalDateTime;

import lombok.Data;
@Data
public class FaqAdmin {
	private Long faqNo;
	private String faqTitle;
	private String content;
	private Date regDate;
}
