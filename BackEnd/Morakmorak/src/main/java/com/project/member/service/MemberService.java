package com.project.member.service;

import java.util.Map;

import com.project.member.model.Member;
import com.project.member.model.MemberDTO;

public interface MemberService {
	boolean duplicateCheck(Member member);

	boolean nickDuplicateCheck(Member member);

	void register(MemberDTO memberDTO);

	void infoChange(MemberDTO memberDTO);

	boolean phoneDuplicateCheck(MemberDTO memberDTO);

	Member loginCheck(Member member);

	Member selectMemberByNo(Member member);

	boolean snsUserCheck(Member member);

	Member selectSnsInfo(Member member);

	boolean passCheck(Member member);

	boolean passCheckNo(Member member);
	
	void deleteMember(Member member);
	
	Map<String, Object> findMemberId(Map<String, Object> map);
	
	Map<String, Object> findMemberPw(Map<String, Object> map);
	
	void changeMemberPw(Map<String, Object> map);
}
