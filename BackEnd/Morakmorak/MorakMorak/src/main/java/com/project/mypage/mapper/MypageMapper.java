package com.project.mypage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.mypage.model.TransactionLog;

@Mapper
public interface MypageMapper {
	public List<TransactionLog> selectTransactionLog(int no);
}
