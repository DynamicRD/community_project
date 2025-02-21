package com.project.admin.service;

import java.util.List;
import java.util.Map;

public interface MemberAdminService {
	List<Map<String, Object>> getUsers();

	List<Map<String, Object>> getAllGroups();

	boolean approveGroup(int groupNo);

	boolean rejectGroup(int groupNo);

	List<Map<String, Object>> getProfit();

	List<Map<String, Object>> genderCount();

	List<Map<String, Object>> countVisitGroup();

	List<Map<String, Object>> countAge();

	List<Map<String, Object>> selectPopularCategory();
	
	List<Map<String, Object>> getCommunityDetail(int groupNo);

}