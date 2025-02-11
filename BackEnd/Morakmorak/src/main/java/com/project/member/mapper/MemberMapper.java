package com.project.member.mapper;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.member.model.Member;

@Mapper
public interface MemberMapper {
	public int idDuplicateCheck(Member member);

	public int nickDuplicateCheck(Member member);

	public void register(Member member);

	public Member loginCheck(Member member);

	public String passCompare(Member member);

	void insertMember(Member member);

	Member findByEmail(String email);

	
	public int phoneDuplicateCheck(Member member);
}
