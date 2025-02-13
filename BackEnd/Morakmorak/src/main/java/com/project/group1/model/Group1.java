package com.project.group1.model;

import java.util.Date;

import lombok.Data;

@Data
public class Group1 {
	private int gId;
	private int id;
	private String gTitle;
	private Date regDate;
	private String category;
	private int userMax;
	private int price;
	private String addr1;
	private String addr2;
	private String latitude;
	private String longtitude;
	private Date startDate;
	private Date lastDate;
	private String comment1;
	private String comment2;
	private String approval;
	private int views;
	private String imgUrl1;
	private String imgUrl2;
	private String imgUrl3;
	private String type;
}
