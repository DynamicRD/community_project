package com.project.group_morak.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.Data;

@Data
public class GroupMorak {
    private int groupNo;
    private int id;
    private String gTitle;
    private LocalDateTime regDate; // LocalDateTime으로 변경
    private String category;
    private int userMax;
    private int price;
    private String addr1;
    private String addr2;
    private String latitude;
    private String longtitude;
    private LocalDateTime startDate; // LocalDateTime으로 변경
    private LocalDateTime lastDate; // LocalDateTime으로 변경
    private String comment1;
    private String comment2;
    private String approval;
    private int views;
    private String imgUrl1;
    private String imgUrl2;
    private String imgUrl3;
    private String type;

    // startDate, lastDate에 대한 파싱 메소드 추가
    public void setStartDate(String startDate) {
        if (startDate != null && !startDate.isEmpty()) {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                this.startDate = LocalDateTime.parse(startDate, formatter);
            } catch (Exception e) {
                System.out.println("START_DATE: Unsupported Date Format");
                this.startDate = null; // 오류 발생 시 null로 설정
            }
        } else {
            System.out.println("START_DATE: No Date Available");
            this.startDate = null; // 빈 값 처리
        }
    }

    public void setLastDate(String lastDate) {
        if (lastDate != null && !lastDate.isEmpty()) {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                this.lastDate = LocalDateTime.parse(lastDate, formatter);
            } catch (Exception e) {
                System.out.println("LAST_DATE: Unsupported Date Format");
                this.lastDate = null; // 오류 발생 시 null로 설정
            }
        } else {
            System.out.println("LAST_DATE: No Date Available");
            this.lastDate = null; // 빈 값 처리
        }
    }

    public String getStartDateString() {
        if (this.startDate != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            return this.startDate.format(formatter);
        } else {
            return "No Date Available"; // 값이 없을 경우 메시지 반환
        }
    }

    public String getLastDateString() {
        if (this.lastDate != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            return this.lastDate.format(formatter);
        } else {
            return "No Date Available"; // 값이 없을 경우 메시지 반환
        }
    }
}
