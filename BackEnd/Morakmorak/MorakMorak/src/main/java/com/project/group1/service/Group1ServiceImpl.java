package com.project.group1.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.group1.mapper.Group1Mapper;

@Service
public class Group1ServiceImpl implements Group1Service {
	@Autowired
	private Group1Mapper mapper;

	@Override
	public void insert(Map<String, Object> map) throws Exception {
		mapper.insert(map);
	}

	@Override
	public List<Map<String, Object>> list(String type) throws Exception {
		return mapper.list(type);
	}

	@Override
	public Map<String, Object> read(String gId) {
		return mapper.read(gId);
	}

	@Override
	public void update(String gId) {
		mapper.update(gId);
	}
}
