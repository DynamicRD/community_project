package com.project.mypage.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class GroupMember {
	private int no;
	private LocalDate startDate;
	private LocalDate endDate;
	private String statues;
	private int amount;
	private String groupName;
}
