package com.project.mypage.mapper;

import java.util.List;
import java.util.Map;

import com.project.member.model.Member;
import com.project.mypage.model.GroupMember;
import com.project.mypage.model.TransactionLog;

public interface MypageMapper {
	List<TransactionLog> selectTransactionLog(int no);

	void insertProfile(Map<String, Object> map) throws Exception;

	String selectProfileImg(Map<String, Object> map) throws Exception;

	void chargeAmount(Member member) throws Exception;

	void insertHistory(TransactionLog transactionLog) throws Exception;

	List<GroupMember> getGroupMembersByUserNoHeart(int no);

	List<GroupMember> getGroupMembersByUserNoOngoing(int no);

	List<GroupMember> getGroupMembersByUserNoEnd(int no);
}
