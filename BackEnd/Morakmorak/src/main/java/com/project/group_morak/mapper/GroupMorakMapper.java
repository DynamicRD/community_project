package com.project.group_morak.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GroupMorakMapper {
	public void insert(Map<String, Object> map);
	
	public List<Map<String, Object>> list(String type) throws Exception;

	public Map<String, Object> read(String groupNo);

	public void update(Map<String, Object> map); 
}
