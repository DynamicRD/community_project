package com.project.admin.service;

import java.util.List;
import java.util.Map;

public interface MemberAdminService {
	List<Map<String, Object>> getUsers();

	List<Map<String, Object>> getAllGroups();
    boolean approveGroup(int groupNo);

    boolean rejectGroup(int groupNo);

}