package com.project.member.mapper;

import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.member.model.Member;

@Mapper
public interface MemberMapper {
	int idDuplicateCheck(Member member);

	int nickDuplicateCheck(Member member);

	void register(Member member);
	
	void registerSns(Member member);
	
	void updateInfo(Member member);
	
	void updateInfoSns(Member member);

	Member loginCheck(Member member);

	String passCompare(Member member);
	
	String passCompareNo(Member member);

	void insertMember(Member member);

	Member findByEmail(String email);
	
	int phoneDuplicateCheck(Member member);
	
	Member getMemberInfoByNo(Member member);
	
	int snsRegisteredCheck(Member member);
	
	Member getSnsInfo(Member member);
	
	void deleteMemeber(Member member);
	
	Map<String, Object> findMemberId(Map<String, Object> map);

	Map<String, Object> findMemberPw(Map<String, Object> map);
	
	void changeMemberPw(Map<String, Object> map);
	
}
