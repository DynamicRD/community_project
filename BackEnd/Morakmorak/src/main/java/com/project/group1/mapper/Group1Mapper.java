package com.project.group1.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface Group1Mapper {
	public void insert(Map<String, Object> map);
	
	public List<Map<String, Object>> list(String type) throws Exception;

	public List<Map<String, Object>> read(String gId); 
}
