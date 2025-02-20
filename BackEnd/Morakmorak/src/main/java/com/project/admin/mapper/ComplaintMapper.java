package com.project.admin.mapper;

import java.util.List;
import java.util.Map;

public interface ComplaintMapper {
	
	public List<Map<String, Object>> complaintList() throws Exception;
	
	public void complaintStatus(Map<String, Object> map) throws Exception;
}
