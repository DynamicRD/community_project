package com.project.admin.model;

import lombok.Data;

@Data
public class DashboardAdmin {
	private double monthBeforeData;
	private double CurrentData;
	private double change;
	private String status;
}
