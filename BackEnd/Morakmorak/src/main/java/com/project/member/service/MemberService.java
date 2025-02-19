package com.project.member.service;

import java.io.IOException;
import java.util.Map;

import java.util.Map;

import com.project.member.model.Member;
import com.project.member.model.MemberRegist;

public interface MemberService {
	boolean duplicateCheck(Member member);

	boolean nickDuplicateCheck(Member member);

	void register(MemberRegist memberDTO) throws IOException;

	void infoChange(MemberRegist memberDTO);

	boolean phoneDuplicateCheck(MemberRegist memberDTO);

	Member loginCheck(Member member);

	Member selectMemberByNo(Member member);

	boolean snsUserCheck(Member member);

	Member selectSnsInfo(Member member);

	boolean passCheck(Member member);

	boolean passCheckNo(Member member);
	
	void deleteMember(Member member);
}
