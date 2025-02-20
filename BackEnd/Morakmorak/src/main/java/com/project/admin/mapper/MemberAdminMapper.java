package com.project.admin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface MemberAdminMapper {
	List<Map<String, Object>> getUsers();

	List<Map<String, Object>> getAllGroups(); // 모든 모임 조회

	int approveGroup(@Param("groupNo") int groupNo); // 모임 승인 처리

	
	int rejectGroup(@Param("groupNo") int groupNo);
	
	List<Map<String, Object>> getProfit();
	
	List<Map<String, Object>> genderCount();
	
	List<Map<String, Object>> countVisitGroup();
	List<Map<String, Object>> countAge();

}
