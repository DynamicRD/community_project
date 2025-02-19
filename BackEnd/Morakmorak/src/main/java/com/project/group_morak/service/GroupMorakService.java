package com.project.group_morak.service;

import java.util.List;
import java.util.Map;

public interface GroupMorakService {
	public void insert(Map<String, Object> map) throws Exception; 
	
	public List<Map<String, Object>> list(String type) throws Exception;

	public Map<String, Object> read(String groupNo);

	public void update(Map<String, Object> map);

	public void join(Map<String, Object> map);

	public void changeMoney(Map<String, Object> map);

	public void insertBasket(Map<String, Object> map);

	public List<Map<String, Object>> memberList(String groupNo);

	public void memberStatusUpdate(Map<String, Object> map);

	public void memberReport(Map<String, Object> map);
}
