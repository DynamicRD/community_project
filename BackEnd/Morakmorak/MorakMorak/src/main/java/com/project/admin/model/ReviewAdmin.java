package com.project.admin.model;

import lombok.Data;

@Data
public class ReviewAdmin {
    private Long id;
    private String title;
    private String writer;
    private String img;
    private String content;
    private int rating;
    private boolean hidden;
}

