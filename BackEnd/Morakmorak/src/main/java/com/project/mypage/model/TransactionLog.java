package com.project.mypage.model;



import java.time.LocalDateTime;

import lombok.Data;


@Data
public class TransactionLog {
    private String type; 
    private Integer amount;
    private LocalDateTime regDate; 
}
