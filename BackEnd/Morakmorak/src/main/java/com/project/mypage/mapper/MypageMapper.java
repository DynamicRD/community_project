package com.project.mypage.mapper;

import java.util.List;
import java.util.Map;

import com.project.member.model.Member;
import com.project.mypage.model.GroupMember;
import com.project.mypage.model.Notification;
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

	List<Notification> selectNotification(int no); 
	
	void readNotification(int no);
	
	List<GroupMember> getMineGroup(int no);
	
	List<GroupMember> getMineEndGroup(int no);
	
	List<GroupMember> getMineLeaderGroup(int no);
	
	void insertNotification(Notification notification);
	
	int selectNoFromGroup(int groupNo);
	
	String selectGroupNameFromGroup(int groupNo);
	
	String selectNickNameByNo(int no);
}
