package com.project.review.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReviewMapper {

	public void insertReview(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> listReview() throws Exception;

	public Map<String, Object> readReview(int idx) throws Exception;
	
	public void replyInsert(Map<String, Object> map) throws Exception;
	
	public List<Map<String, Object>> replyList() throws Exception;

}
