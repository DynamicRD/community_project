package com.project.member.service;

import java.util.Map;

import com.project.member.model.Member;
import com.project.member.model.MemberDTO;

public interface MemberService {
	boolean duplicateCheck(Member member);

	boolean nickDuplicateCheck(Member member);

	void register(MemberDTO memberDTO);

	boolean phoneDuplicateCheck(MemberDTO memberDTO);

	Member loginCheck(Member member);

	Map<String, String> kakaoLogin(String accessToken);
	
	Member selectMemberByNo(Member member);
}
