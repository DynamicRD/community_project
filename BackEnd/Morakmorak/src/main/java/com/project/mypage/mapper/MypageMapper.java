package com.project.mypage.mapper;

import java.util.List;

import com.project.mypage.model.TransactionLog;

public interface MypageMapper {
	public List<TransactionLog> selectTransactionLog(int no);
}
