package com.project.mypage.service;

import java.util.List;
import java.util.Map;

import com.project.member.model.Member;
import com.project.mypage.model.GroupMember;
import com.project.mypage.model.TransactionLog;

public interface MypageService {
	List<TransactionLog> selectTransactionLog(int no);

	void insertProfile(Map<String, Object> map) throws Exception;

	void chargeAmount(Member member) throws Exception;

	List<GroupMember> getGroupMembers(int userNo);
}
