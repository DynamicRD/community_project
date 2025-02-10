package com.project.member.service;

import com.project.member.model.Member;
import com.project.member.model.MemberDTO;

public interface MemberService {
	public boolean duplicateCheck(Member member);

	public boolean nickDuplicateCheck(Member member);

	public void register(MemberDTO memberDTO);

	Member getUserByIdAndProvider(Member member);// 아이디 ,provider로 유저정보 가져오

	Member checkRegist(Member member);

	Member loginCheck(Member member);

	boolean insert(Member member);

	public Member getUserByAccessToken(String accessToken);

	Member findCommonUserByEmail(Member member);

	Member findCommonUserByEmailAndId(Member member);

	boolean updateRandomPwdById(Member member);
}
