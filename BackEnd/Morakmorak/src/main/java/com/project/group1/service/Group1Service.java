package com.project.group1.service;

import java.util.List;
import java.util.Map;

public interface Group1Service {
	public void insert(Map<String, Object> map) throws Exception; 
	
	public List<Map<String, Object>> list(String type) throws Exception;

	public List<Map<String, Object>> read(String gId); 
}
