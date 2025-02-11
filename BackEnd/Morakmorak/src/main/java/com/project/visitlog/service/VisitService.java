package com.project.visitlog.service;

import com.project.visitlog.model.VisitLog;

public interface VisitService {
	// 방문 기록 저장
	public void insert(VisitLog visitLog) throws Exception;
}
