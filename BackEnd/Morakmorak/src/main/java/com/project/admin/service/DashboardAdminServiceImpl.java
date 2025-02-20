package com.project.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.admin.mapper.DashboardAdminMapper;
import com.project.admin.model.DashboardAdmin;

@Service
public class DashboardAdminServiceImpl implements DashboardAdminService {
	@Autowired
	DashboardAdminMapper mapper;
	
	@Override
	public DashboardAdmin getCustomerCount() {
		DashboardAdmin admin = new DashboardAdmin();
		admin.setMonthBeforeData(mapper.getMonthCustomerCount());
		admin.setCurrentData(mapper.getCurrentCustomerCount());
		if(admin.getMonthBeforeData() != 0) {
			admin.setChange((admin.getCurrentData()-admin.getMonthBeforeData())/admin.getMonthBeforeData()); 
			if(admin.getChange()>0) {
				admin.setStatus("increase");
			}else {
				admin.setChange(-admin.getChange());
				admin.setStatus("decrease");
			}
		}else {
			admin.setChange(0);
			admin.setStatus("none");
		}
		return admin;
	}
}
