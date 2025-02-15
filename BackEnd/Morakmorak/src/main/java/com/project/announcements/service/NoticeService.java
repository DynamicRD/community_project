package com.project.announcements.service;

import java.util.List;
import java.util.Map;

public interface NoticeService {
	
	public List<Map<String, Object>> listNotice() throws Exception;

	public void insertNotice(Map<String, Object> map) throws Exception;
	
	public Map<String, Object> readNotice(int idx) throws Exception;

}
