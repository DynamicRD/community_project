package com.project.announcements.service;

import java.util.List;
import java.util.Map;

public interface FaqService {
	
	public List<Map<String, Object>> listFaq() throws Exception;

	public void insertFaq(Map<String, Object> map) throws Exception;
	

}
