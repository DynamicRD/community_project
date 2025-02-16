package com.project.mypage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.mypage.mapper.MypageMapper;
import com.project.mypage.model.TransactionLog;

@Service
public class MypageServiceImpl implements MypageService {
	@Autowired
	private MypageMapper mapper;
	
	
	@Override
	public List<TransactionLog> selectTransactionLog(int no) {
		return mapper.selectTransactionLog(no);
	}

}
