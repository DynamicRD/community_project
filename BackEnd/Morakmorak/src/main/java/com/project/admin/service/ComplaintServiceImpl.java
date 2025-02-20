package com.project.admin.service;

import java.util.List;

import java.util.Map;
import com.project.admin.mapper.ComplaintMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComplaintServiceImpl implements ComplaintService {

	@Autowired
	private ComplaintMapper mapper;

	@Override
	public List<Map<String, Object>> complaintList() throws Exception {
		return mapper.complaintList();
	}

	@Override
	public void complaintStatus(Map<String, Object> map) throws Exception {
		System.out.println("mapper = " + map);
		mapper.complaintStatus(map);
	}

}
