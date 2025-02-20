package com.project.review.mapper;

import java.util.List;
import java.util.Map;

public interface ReviewMapper {

	public void insertReview(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> listReview() throws Exception;

	public Map<String, Object> readReview(int idx) throws Exception;
	
	public void replyInsert(Map<String, Object> map) throws Exception;
	
	public List<Map<String, Object>> replyList(int idx) throws Exception;

	public List<Map<String, Object>> groupList(int idx) throws Exception;
	
	public Map<String, Object> readGroup(int idx) throws Exception;
	
	public void deleteReview(int idx) throws Exception;
	
	public void deleteReply(int idx) throws Exception;

}
