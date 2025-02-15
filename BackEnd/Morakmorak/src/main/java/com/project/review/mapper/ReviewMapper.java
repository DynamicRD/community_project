package com.project.review.mapper;

import java.util.List;
import java.util.Map;

public interface ReviewMapper {
	
	public void insertReview(Map<String, Object> map) throws Exception;
	
	public List<Map<String, Object>> listReview() throws Exception;
	
	public List<Map<String, Object>> list2() throws Exception;
	
	public Map<String, Object> readReview(int idx) throws Exception;
	
	public void insert2(Map<String, Object> map) throws Exception;
}
