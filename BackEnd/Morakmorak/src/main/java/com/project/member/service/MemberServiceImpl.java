package com.project.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.member.mapper.MemberMapper;
import com.project.member.model.Member;
import com.project.member.model.MemberDTO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberMapper mapper;

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

		// 비밀번호 암호화
		String rawPassword = memberDTO.getPass(); // 원래 비밀번호
		String encryptedPassword = encoder.encode(rawPassword);
		System.out.println(encryptedPassword);
		member.setPw(encryptedPassword);
		member.setNickname(memberDTO.getNickname());
		member.setName(memberDTO.getName());
		member.setPhone(memberDTO.getPhone1() + memberDTO.getPhone2() + memberDTO.getPhone3());
		System.out.println("생일 " + memberDTO.getBirth());
		member.setGender(memberDTO.getGender());
		member.setBirth(memberDTO.getBirth());
		member.setEmail(memberDTO.getEmail());
		member.setZipCode(memberDTO.getAddcode());
		member.setAddr1(memberDTO.getAddress01());
		member.setAddr2(memberDTO.getAddress02());
		mapper.register(member);
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
		if(!isMatch) {
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
	public boolean insert(Member member) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Member getUserByAccessToken(String accessToken) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Member findCommonUserByEmail(Member member) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Member findCommonUserByEmailAndId(Member member) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean updateRandomPwdById(Member member) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Member getUserByIdAndProvider(Member member) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Member checkRegist(Member member) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
