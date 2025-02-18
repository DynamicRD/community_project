package com.project.mypage.service;

import java.util.List;

import com.project.mypage.model.TransactionLog;

public interface MypageService {
	List<TransactionLog> selectTransactionLog(int no);
}
