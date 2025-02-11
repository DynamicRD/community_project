package com.project.visitlog.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.project.visitlog.model.VisitLog;


public interface VisitMapper {
	public void insert(VisitLog visitLog) throws Exception;
}
