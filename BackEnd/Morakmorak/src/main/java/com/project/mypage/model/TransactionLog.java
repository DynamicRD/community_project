package com.project.mypage.model;



import java.time.LocalDateTime;

import lombok.Data;


@Data
public class TransactionLog {
	private int no;
    private String type; 
    private Integer amount;
    private LocalDateTime regDate; 
}
