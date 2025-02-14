package com.project.review.service;

import java.util.List;
import java.util.Map;

public interface ReviewService {

	public Map<String, Object> readReview(int idx) throws Exception;

	public List<Map<String, Object>> listReview() throws Exception;

	public void insertReview(Map<String, Object> map) throws Exception;
	
	public void replyInsert(Map<String, Object> map) throws Exception;
	
	public List<Map<String, Object>> replyList() throws Exception;

	public List<Map<String, Object>> groupList() throws Exception;
	
	public Map<String, Object> readGroup(int idx) throws Exception;
}
