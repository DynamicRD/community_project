package com.project.member.mapper;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.member.model.Member;

@Mapper
public interface MemberMapper {
	int idDuplicateCheck(Member member);

	int nickDuplicateCheck(Member member);

	void register(Member member);
	
	void registerGoogle(Member member);
	
	void updateInfo(Member member);
	
	void updateInfoGoogle(Member member);

	Member loginCheck(Member member);

	String passCompare(Member member);

	void insertMember(Member member);

	Member findByEmail(String email);

	
	int phoneDuplicateCheck(Member member);
	
	Member getMemberInfoByNo(Member member);
	
	int googleRegisteredCheck(Member member);
	
	Member getGoogleInfo(Member member);
}
