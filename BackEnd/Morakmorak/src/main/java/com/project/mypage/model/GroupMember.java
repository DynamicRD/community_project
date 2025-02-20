package com.project.mypage.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class GroupMember {
	private int no;
	private LocalDate startDate;
	private LocalDate lastDate;
	private String status;
	private int price;
	private String groupTitle;
	
    public GroupMember(String status) {
        this.status = convertStatus(status);
    }

    private String convertStatus(String status) {
        switch (status) {
            case "WAITING":
                return "신청대기중";
            case "REJECT":
                return "거절됨";
            case "MEMBER":
                return "진행중";
            default:
                return status; // 예상치 못한 값은 그대로 유지
        }
    }
}

