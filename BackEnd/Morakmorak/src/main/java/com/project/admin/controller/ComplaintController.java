package com.project.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.admin.service.ComplaintService;

import com.project.member.service.MemberService;
import com.project.member.model.Member;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/complaint")
public class ComplaintController {

	@Autowired
	private ComplaintService Complaintservice;
	@Autowired
	private MemberService MemberService;

	@GetMapping(value = "/list")
	public List<Map<String, Object>> complaintList() throws Exception {
		List<Map<String, Object>> listMap = Complaintservice.complaintList();
		return listMap;
	}

	@PostMapping(value = "/status")
	public void complaintStatusWarning(@RequestParam("number") int number, @RequestParam("type") String type,
			@RequestParam("reported_no") int reportedNo, @RequestParam("report_content") String report_content) throws Exception {
		Map<String, Object> map = new HashMap<>();
		map.put("idx", number);
		map.put("type", type);
		map.put("reportContent", report_content);
		Complaintservice.complaintStatus(map);

		// 멤버
		if (type.equals("W")) {
			Member member = new Member();
			member.setNo(reportedNo);
			MemberService.changeMemberBlack(member);
		}

	}

}
