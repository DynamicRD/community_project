package com.project.admin.service;

import java.util.List;
import java.util.Map;

public interface ComplaintService {

	public List<Map<String, Object>> complaintList() throws Exception;
	
	public void complaintStatus(Map<String, Object> map) throws Exception;
}
