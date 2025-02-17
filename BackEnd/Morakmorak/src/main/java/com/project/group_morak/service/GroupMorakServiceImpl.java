package com.project.group_morak.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.group_morak.mapper.GroupMorakMapper;

@Service
public class GroupMorakServiceImpl implements GroupMorakService {
	@Autowired
	private GroupMorakMapper mapper;

	@Override
	public void insert(Map<String, Object> map) throws Exception {
		mapper.insert(map);
	}

	@Override
	public List<Map<String, Object>> list(String type) throws Exception {
		return mapper.list(type);
	}

	@Override
	public Map<String, Object> read(String groupNo) {
		return mapper.read(groupNo);
	}

	@Override
	public void update(Map<String, Object> map) {
		mapper.update(map);
	}

	@Override
	public void join(Map<String, Object> map) {
		mapper.join(map);
	}

	@Override
	public void changeMoney(Map<String, Object> map) {
		mapper.changeMoney(map);
	}

	@Override
	public void insertBasket(Map<String, Object> map) {
		mapper.insertBasket(map);
	}

	@Override
	public List<Map<String, Object>> memberList(String groupNo) {
		return mapper.memberList(groupNo);
	}

}
