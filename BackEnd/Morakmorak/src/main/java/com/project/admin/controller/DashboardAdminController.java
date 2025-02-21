package com.project.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.admin.model.CommentAdmin;
import com.project.admin.model.DashboardAdmin;
import com.project.admin.service.CommentAdminService;
import com.project.admin.service.DashboardAdminService;
import com.project.group_morak.model.GroupMorak;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/dashboard")
@RequiredArgsConstructor
public class DashboardAdminController {
	private final DashboardAdminService service;
	
	@GetMapping("/detailselect")
	public Map<String, DashboardAdmin> getDetailGroups() {
	    Map<String, DashboardAdmin> result = new HashMap<>();
	    
	    result.put("customerCount", service.getCustomerCount());
	    result.put("profitChange", service.getProfitChange());
	    result.put("groupMemberChange", service.getGroupMemberChange());
	    result.put("visitLogChange", service.getVisitLogChange());
	    
	    return result;
	}
	
}
