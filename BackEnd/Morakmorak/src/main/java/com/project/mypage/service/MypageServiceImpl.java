package com.project.mypage.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.member.model.Member;
import com.project.mypage.mapper.MypageMapper;
import com.project.mypage.model.GroupMember;
import com.project.mypage.model.TransactionLog;

@Service
public class MypageServiceImpl implements MypageService {
	@Autowired
	private MypageMapper mapper;
	private static final String UPLOAD_DIR = "D:/community_project/communiy_react/public/images/";
	
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
	public List<GroupMember> getGroupMembers(int no) {
		 return mapper.getGroupMembersByUserNo(no);
	}
	
	
}
