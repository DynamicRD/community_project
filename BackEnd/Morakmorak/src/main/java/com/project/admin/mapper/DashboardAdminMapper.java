package com.project.admin.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DashboardAdminMapper {
	double getCurrentCustomerCount();
	
	double getMonthCustomerCount();
}
