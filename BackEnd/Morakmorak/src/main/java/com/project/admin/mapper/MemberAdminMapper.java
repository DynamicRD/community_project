package com.project.admin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberAdminMapper {
	List<Map<String, Object>> getUsers();
	List<Map<String, Object>> getGroups();
}
