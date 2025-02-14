package com.project.member.service;

import com.project.member.model.Member;
import com.project.member.model.MemberDTO;

public interface MemberService {
	boolean duplicateCheck(Member member);

	boolean nickDuplicateCheck(Member member);

	void register(MemberDTO memberDTO);

	boolean phoneDuplicateCheck(MemberDTO memberDTO);

	Member loginCheck(Member member);

	Member selectMemberByNo(Member member);
}
