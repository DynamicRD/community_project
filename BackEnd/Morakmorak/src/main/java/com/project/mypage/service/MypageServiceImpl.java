package com.project.mypage.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.project.common.config.SecretConfig;
import com.project.member.model.Member;
import com.project.mypage.mapper.MypageMapper;
import com.project.mypage.model.GroupMember;
import com.project.mypage.model.TransactionLog;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MypageServiceImpl implements MypageService {
	@Autowired
	private MypageMapper mapper;
	private static final String UPLOAD_DIR = "D:/community_project/communiy_react/public/images/";
	
	@Autowired
//	private JavaMailSender mailSender;
	private SecretConfig secretConfig = new SecretConfig();
	
	@Override
	public List<TransactionLog> selectTransactionLog(int no) {
		return mapper.selectTransactionLog(no);
	}

	
	@Override
	public void  insertProfile(Map<String, Object> map) throws Exception {
		String imgURL = mapper.selectProfileImg(map);
		try {
            // 파일 경로 설정
            Path filePath = Paths.get(UPLOAD_DIR + imgURL);
            File file = filePath.toFile();
            // 파일 존재 여부 확인 후 삭제
            if (file.exists()) {
                Files.delete(filePath);
                System.out.println("파일 삭제 성공: " + imgURL);
            } else {
            	System.out.println("파일을 찾을 수 없음: " + imgURL);
            }
        } catch (Exception e) {
        	System.out.println("파일 삭제 중 오류 발생: " + e.getMessage());
        }
		mapper.insertProfile(map);
	}


	@Override
	public void chargeAmount(Member member) throws Exception {
		mapper.chargeAmount(member);
		TransactionLog transactionLog = new TransactionLog();
		transactionLog.setAmount(member.getMoney());
		transactionLog.setNo(member.getNo());
		transactionLog.setType("충전");
	    System.out.println("거래내역 로그"+transactionLog);
		mapper.insertHistory(transactionLog);
	}


	@Override
	public List<List<GroupMember>> getGroupMembers(int no) {
		List<List<GroupMember>> resultList = new ArrayList<>();
		    // 각 리스트를 resultList에 추가
		    resultList.add(mapper.getGroupMembersByUserNoEnd(no));
		    resultList.add(mapper.getGroupMembersByUserNoHeart(no));
		    resultList.add(mapper.getGroupMembersByUserNoOngoing(no));

		    return resultList;
	}


	@Override
	public void sendEmail(String toEmail, int verifyNum) throws MessagingException {
//		 MimeMessage message = mailSender.createMimeMessage();
//	        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
//
//	        helper.setFrom(secretConfig.getSendEmail());
//	        helper.setTo(toEmail);
//	        helper.setSubject("[모락모락] 회원탈퇴를 위한 이메일 인증코드입니다.");
//	        helper.setText("인증번호 6자리 "+verifyNum+"을 입력해주세요", true); // HTML 지원
//
//	        mailSender.send(message);
		
	}



	
	
}
