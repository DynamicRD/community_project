package com.project.announcements.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.announcements.mapper.FaqMapper;
import com.project.announcements.mapper.NoticeMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FaqServiceImpl implements FaqService {

	@Autowired
	private FaqMapper mapper;

	@Override
	public List<Map<String, Object>> listFaq() throws Exception {
		return mapper.listFaq();
	}

	@Override
	public void insertFaq(Map<String, Object> map) throws Exception {
		log.info("notice = " + map);
		mapper.insertFaq(map);
	}

}
