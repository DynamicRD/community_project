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
	public List<Map<String, Object>> list2() throws Exception {
		return mapper.list2();
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
	public void insert2(Map<String, Object> map) throws Exception {
		mapper.insert2(map);
	}

}
