package com.project.member.service;

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
}
