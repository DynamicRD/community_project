package com.project.visitlog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.visitlog.mapper.VisitMapper;
import com.project.visitlog.model.VisitLog;


@Service
public class VisitServiceImpl implements VisitService {

	@Autowired
	private VisitMapper mapper;
	
	@Override
	public void insert(VisitLog visitLog) throws Exception {
		mapper.insert(visitLog);
		System.out.println("Impl"+visitLog);
	}

}
