package com.project.mypage.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.project.common.config.SecretConfig;
import com.project.member.model.Member;
import com.project.mypage.mapper.MypageMapper;
import com.project.mypage.model.GroupMember;
import com.project.mypage.model.Notification;
import com.project.mypage.model.TransactionLog;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MypageServiceImpl implements MypageService {
	@Autowired
	private MypageMapper mapper;

	@Autowired
	private JavaMailSender mailSender;
	private SecretConfig secretConfig = new SecretConfig();

	@Override
	public List<TransactionLog> selectTransactionLog(int no) {
		return mapper.selectTransactionLog(no);
	}

	@Override
	public void insertProfile(Map<String, Object> map) throws Exception {
		String imgURL = mapper.selectProfileImg(map);
		String uploadPath = Paths.get("src/main/resources/static/upload").toAbsolutePath().toString() + "/";
		try {
			// 파일 경로 설정
			Path filePath = Paths.get(uploadPath + imgURL);
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

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

		helper.setFrom(secretConfig.getSendEmail());
		helper.setTo(toEmail);
		helper.setSubject("[모락모락] 회원탈퇴를 위한 이메일 인증코드입니다.");
		helper.setText("인증번호 6자리 " + verifyNum + "을 입력해주세요", true); // HTML 지원
		System.out.println("메세지 전송직전");
		mailSender.send(message);
		System.out.println("메세지 전송됨");

	}

	@Override
	public List<Notification> selectNotification(int no) {
		return mapper.selectNotification(no);
	}

	@Override
	public void readNotification(int no) {
		mapper.readNotification(no);
	}

	@Override
	public List<GroupMember> getMineGroup(String category, int no) {
	    List<GroupMember> list;

	    if (category.equals("member")) {
	        list = mapper.getMineGroup(no);
	        return list.stream()
	                   .map(member -> {
	                       member.setStatus(convertStatus(member.getStatus())); // 변환 적용
	                       return member;
	                   })
	                   .collect(Collectors.toList());
	    } else if (category.equals("leader")) {
	        list = mapper.getMineLeaderGroup(no);
	        return list.stream()
	                   .map(member -> {
	                       member.setStatus(convertStatus(member.getStatus())); // 변환 적용
	                       return member;
	                   })
	                   .collect(Collectors.toList());
	    } else {
	        list = mapper.getMineEndGroup(no);
	        return list.stream()
	                   .map(member -> {
	                       member.setStatus(convertEndStatus(member.getStatus())); // 변환 적용
	                       return member;
	                   })
	                   .collect(Collectors.toList());
	    }
	}

	private String convertStatus(String status) {
	    switch (status) {
	        case "WAITING":
	            return "신청대기중";
	        case "REJECT":
	            return "거절됨";
	        case "MEMBER":
	            return "진행중";
	        case "N":
	            return "승인대기중";
	        case "Y":
	            return "승인됨";
	        default:
	            return status; // 예상치 못한 값은 그대로 유지
	    }
	}

	private String convertEndStatus(String endStatus) {
	    switch (endStatus) {
	        case "LEADER":
	            return "모임장";
	        case "MEMBER":
	            return "멤버";
	        default:
	            return endStatus; // 예상치 못한 값은 그대로 유지
	    }
	}

}
