package com.project.group_morak.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.group_morak.model.GroupMorak;

@Mapper
public interface GroupMorakMapper {

	public void insert(Map<String, Object> map);
	
	public void insertLeader(Map<String, Object> map); 
	
	public List<Map<String, Object>> list(String type) throws Exception;

	public Map<String, Object> read(String groupNo);

	public void update(Map<String, Object> map);

	public void join(Map<String, Object> map);

	public void changeMoney(Map<String, Object> map);

	public void insertBasket(Map<String, Object> map);

	public List<Map<String, Object>> memberList(String groupNo);
	
	public String groupAuth(Map<String, Object> map);

	public void memberStatusUpdate(Map<String, Object> map);

	public void memberReport(Map<String, Object> map);
	
	public List<GroupMorak> getGroupsByCategory(String category);
	
	public List<GroupMorak> getGroupsByCategoryAll();
}
