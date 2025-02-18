package com.project.announcements.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
@Mapper
public interface FaqMapper {

	public List<Map<String, Object>> listFaq() throws Exception;
	
	public void insertFaq(Map<String, Object> map) throws Exception;

}
