package com.project.announcements.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.announcements.mapper.NoticeMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class NoticeServiceImpl implements NoticeService {

	@Autowired
	private NoticeMapper mapper;

	@Override
	public void insertNotice(Map<String, Object> map) throws Exception {
		log.info("notice = " + map);
		mapper.insertNotice(map);
	}

	@Override
	public List<Map<String, Object>> listNotice() throws Exception {
		return mapper.listNotice();
	}
	

	@Override
	public Map<String, Object> readNotice( int idx) throws Exception {
		log.info("idx = " + idx);
		mapper.readNotice(idx);
		return mapper.readNotice(idx);
		
	}

}
