package com.project.admin.service;


import com.project.admin.model.DashboardAdmin;

public interface DashboardAdminService {
	DashboardAdmin getCustomerCount();

	DashboardAdmin getProfitChange();

	DashboardAdmin getVisitLogChange();

	DashboardAdmin getGroupMemberChange();
}
