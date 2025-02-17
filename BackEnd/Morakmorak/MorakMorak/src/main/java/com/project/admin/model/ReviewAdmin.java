package com.project.admin.model;

import lombok.Data;

@Data
public class ReviewAdmin {
    private Long no;
    private Long reviewNo;
    private String reviewTitle;
    private String writer;
    private String imgUrl;
    private String content;
    private int star;
    private String isblacked;
}

