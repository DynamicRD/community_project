package com.project.mypage.service;

import java.util.List;
import java.util.Map;

import com.project.member.model.Member;
import com.project.mypage.model.GroupMember;
import com.project.mypage.model.Notification;
import com.project.mypage.model.TransactionLog;

import jakarta.mail.MessagingException;

public interface MypageService {
	List<TransactionLog> selectTransactionLog(int no);

	void insertProfile(Map<String, Object> map) throws Exception;

	void chargeAmount(Member member) throws Exception;

	List<List<GroupMember>> getGroupMembers(int userNo);
	
	void sendEmail(String toEmail, int verifyNum) throws MessagingException;

	List<Notification> selectNotification(int no) ;
	
	void readNotification(int no);
	
	List<GroupMember> getMineGroup(String category, int no);
}
