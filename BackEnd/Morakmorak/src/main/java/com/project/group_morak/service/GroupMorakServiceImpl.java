package com.project.group_morak.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.group_morak.mapper.GroupMorakMapper;
import com.project.group_morak.model.GroupMorak;

@Service
public class GroupMorakServiceImpl implements GroupMorakService {
	@Autowired
	private GroupMorakMapper mapper;

	@Override
	public void insert(Map<String, Object> map) throws Exception {
		mapper.insert(map);
	}

	@Override
	public void insertLeader(Map<String, Object> map) {
		mapper.insertLeader(map);
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

	@Override
	public String groupAuth(Map<String, Object> map) {
		return mapper.groupAuth(map);
	}

	@Override
	public void memberStatusUpdate(Map<String, Object> map) {
		mapper.memberStatusUpdate(map);
	}

	@Override
	public void memberReport(Map<String, Object> map) {
		mapper.memberReport(map);
	}

	@Override
	public List<GroupMorak> getGroupsByCategory(String category, int limit) {
		return mapper.getGroupsByCategory(category, limit);
	}

}
