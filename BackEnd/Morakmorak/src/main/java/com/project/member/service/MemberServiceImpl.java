package com.project.member.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import java.io.*;
import java.nio.file.*;
import com.project.common.config.JwtUtil;
import com.project.common.config.SecretConfig;
import com.project.member.mapper.MemberMapper;
import com.project.member.model.Member;
import com.project.member.model.MemberRegist;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final static SecretConfig secretConfig = new SecretConfig();

	@Autowired
	private MemberMapper mapper;
	private static final String UPLOAD_DIR = "D:/community_project/communiy_react/public/images/";
	
	@Override
	public boolean duplicateCheck(Member member) {
		int count = mapper.idDuplicateCheck(member); // 오타 수정
		return count > 0;
	}

	@Override
	public boolean nickDuplicateCheck(Member member) {
		int count = mapper.nickDuplicateCheck(member); // 오타 수정
		return count > 0;
	}

	@Override
	public void register(MemberRegist memberDTO) {
		Member member = new Member();
		member.setId(memberDTO.getId());
        System.out.println(memberDTO.getId());
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		if(memberDTO.getProvider() == null)
		{
			memberDTO.setProvider("none");
			member.setProvider("none");
		}
		// 비밀번호 암호화
		if (memberDTO.getPass() != null) {
			String rawPassword = memberDTO.getPass(); // 원래 비밀번호
			String encryptedPassword = encoder.encode(rawPassword);
			System.out.println(encryptedPassword);
			member.setPw(encryptedPassword);
		}
		if (memberDTO.getName() != null) {
			member.setName(memberDTO.getName());
		}
		if (memberDTO.getPhone1() != null) {
			member.setPhone(memberDTO.getPhone1() + memberDTO.getPhone2() + memberDTO.getPhone3());
		}
		member.setNickname(memberDTO.getNickname());
		member.setGender(memberDTO.getGender());
		member.setBirth(memberDTO.getBirth());
		member.setEmail(memberDTO.getEmail());
		member.setZipCode(memberDTO.getAddcode());
		member.setAddr1(memberDTO.getAddress01());
		member.setAddr2(memberDTO.getAddress02());
		if (memberDTO.getProvider().equals("google")||memberDTO.getProvider().equals("kakao")) {
			String imageUrl = memberDTO.getPicture();
			// URL에서 파일명 추출
	        String originalFileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

	        // UUID 추가
	        String newFileName = UUID.randomUUID().toString() + "_" + originalFileName;
	        String FilePath = UPLOAD_DIR+newFileName+".jpg";
			 try {
		            RestTemplate restTemplate = new RestTemplate();
		            ResponseEntity<Resource> response = restTemplate.getForEntity(imageUrl, Resource.class);
		            Resource resource = response.getBody();

		            if (resource != null) {
		                InputStream inputStream = resource.getInputStream();
		                Files.copy(inputStream, Paths.get(FilePath), StandardCopyOption.REPLACE_EXISTING);
		                System.out.println("이미지 다운로드 성공: " + FilePath);
		                
		            }
		        } catch (Exception e) {
		            e.printStackTrace();
		        }
			member.setProvider(memberDTO.getProvider());
			member.setProviderId(memberDTO.getProviderId());
			member.setImgUrl(FilePath);
			mapper.registerSns(member);
		} else {
			mapper.register(member);
		}
	}

	
	@Override
	public void infoChange(MemberRegist memberDTO) {
		Member member = new Member();
		

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		member.setNo(memberDTO.getNo());
		// 비밀번호 암호화
		if (memberDTO.getPass() != null) {
			String rawPassword = memberDTO.getPass(); // 원래 비밀번호
			String encryptedPassword = encoder.encode(rawPassword);
			System.out.println(encryptedPassword);
			member.setPw(encryptedPassword);
		}
		if (memberDTO.getName() != null) {
			member.setName(memberDTO.getName());
		}
		if (memberDTO.getPhone1() != null) {
			member.setPhone(memberDTO.getPhone1() + memberDTO.getPhone2() + memberDTO.getPhone3());
		}
		member.setNickname(memberDTO.getNickname());
		member.setGender(memberDTO.getGender());
		member.setBirth(memberDTO.getBirth());
		member.setEmail(memberDTO.getEmail());
		member.setZipCode(memberDTO.getAddcode());
		member.setAddr1(memberDTO.getAddress01());
		member.setAddr2(memberDTO.getAddress02());
		if (memberDTO.getProvider().equals("google")) {
			member.setProvider(memberDTO.getProvider());
			mapper.updateInfoSns(member);
		} else {
			mapper.updateInfo(member);
		}
	}
	@Override
	public boolean phoneDuplicateCheck(MemberRegist memberDTO) {
		Member member = new Member();
		member.setPhone(memberDTO.getPhone1() + memberDTO.getPhone2() + memberDTO.getPhone3());
		int count = mapper.phoneDuplicateCheck(member);
		return count > 0;
	}

	@Override
	public Member loginCheck(Member member) {
		String savedPass = mapper.passCompare(member);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		boolean isMatch = encoder.matches(member.getPw(), savedPass);
		System.out.println(isMatch);
		if (!isMatch) {
			return null;
		}
		try {

			Member userLogin = mapper.loginCheck(member);
			return userLogin; // 중복됐으면 false 중복이 아니며true
		} catch (Exception e) {
			log.error("User CheckRegist Error: {}", e.getMessage());
			throw new RuntimeException("중복 체크 실패", e);
		}
	}

	@Override
	public Member selectMemberByNo(Member member) {
		member = mapper.getMemberInfoByNo(member);
		return member;
	}

	@Override
	public boolean snsUserCheck(Member member) {
		int count = mapper.snsRegisteredCheck(member);
		return (count > 0) ? true : false;
	}

	@Override
	public Member selectSnsInfo(Member member) {
		member = mapper.getSnsInfo(member);
		return member;
	}

	@Override
	public boolean passCheck(Member member) {
		String savedPass = mapper.passCompare(member);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		boolean isMatch = encoder.matches(member.getPw(), savedPass);
		return isMatch;
	}

	@Override
	public void deleteMember(Member member) {
		mapper.deleteMemeber(member);
	}

	@Override
	public boolean passCheckNo(Member member) {
		String savedPass = mapper.passCompareNo(member);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		boolean isMatch = encoder.matches(member.getPw(), savedPass);
		return isMatch;
	}

}
