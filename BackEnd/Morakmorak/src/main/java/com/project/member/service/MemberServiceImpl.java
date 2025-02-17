package com.project.member.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.project.common.config.JwtUtil;
import com.project.common.config.SecretConfig;
import com.project.member.mapper.MemberMapper;
import com.project.member.model.Member;
import com.project.member.model.MemberDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final static SecretConfig secretConfig = new SecretConfig();

	@Autowired
	private MemberMapper mapper;
	private final JwtUtil jwtUtil;
	private final RestTemplate restTemplate = new RestTemplate();

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
	public void register(MemberDTO memberDTO) {
		Member member = new Member();
		member.setId(memberDTO.getId());

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
			member.setProvider(memberDTO.getProvider());
			member.setProviderId(memberDTO.getProviderId());
			mapper.registerGoogle(member);
		} else {
			mapper.register(member);
		}
	}

	
	@Override
	public void infoChange(MemberDTO memberDTO) {
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
			mapper.updateInfoGoogle(member);
		} else {
			mapper.updateInfo(member);
		}
	}
	@Override
	public boolean phoneDuplicateCheck(MemberDTO memberDTO) {
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

	// 🔹 카카오 Access Token 요청 메서드 추가
	private String getAccessToken(String authCode) {
		String tokenUrl = "https://kauth.kakao.com/oauth/token" + "&client_id=" + secretConfig.getKakaoClienID()
				+ "&redirect_uri=" + secretConfig.getKaKaoRedirectURL() + "&code=" + authCode;

		ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, null, Map.class);
		return (String) response.getBody().get("access_token");
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

}
