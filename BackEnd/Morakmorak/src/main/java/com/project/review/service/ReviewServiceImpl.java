package com.project.review.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.review.mapper.ReviewMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private ReviewMapper mapper;

	@Override
	public List<Map<String, Object>> listReview() throws Exception {
		return mapper.listReview();
	}

	@Override
	public Map<String, Object> readReview(int idx) throws Exception {
		return mapper.readReview(idx);
	}

	@Override
	public void insertReview(Map<String, Object> map) throws Exception {
		mapper.insertReview(map);
	}

	@Override
	public void replyInsert(Map<String, Object> map) throws Exception {
		log.info("Servcie map = " + map);
		mapper.replyInsert(map);
		
	}

	@Override
	public List<Map<String, Object>> replyList(int idx) throws Exception {
		return mapper.replyList(idx);
	}

	
	@Override
	public List<Map<String, Object>> groupList(int idx) throws Exception {
		log.info("mapper = " + idx);
		return mapper.groupList(idx);
	}

	@Override
	public Map<String, Object> readGroup(int idx) throws Exception {
		return mapper.readGroup(idx);
	}
	
	@Override
	public void deleteReview(int idx) throws Exception {

		mapper.deleteReview(idx);
	}

	@Override
	public void deleteReply(int idx) throws Exception {

		mapper.deleteReply(idx);
		
	}
	
	
}
