package com.project.member.mapper;


import com.project.member.model.Member;
import com.project.member.model.MemberDTO;

public interface MemberMapper {
	public int idDuplicateCheck(Member member);
	
	public int nickDuplicateCheck(Member member);
	
	public void register(Member member);
	
	public Member loginCheck(Member member);
	
	public String passCompare(Member member);
}
