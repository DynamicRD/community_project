package com.project.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.admin.service.MemberAdminService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/admin")
public class MemberAdminController {
	@Autowired
	private final MemberAdminService memberAdminService;

	public MemberAdminController(MemberAdminService memberAdminService) {
        this.memberAdminService = memberAdminService;
    }

    @GetMapping("/users")
    public List<Map<String, Object>> getUsers() {
        return memberAdminService.getUsers();
    }
    /**
     * 모든 모임 리스트 조회 
     */
    @GetMapping("/community")
    public ResponseEntity<List<Map<String, Object>>> getAllGroups() {
        return ResponseEntity.ok(memberAdminService.getAllGroups());
    }

    /**
     * 특정 모임 승인 처리
     */
    @PostMapping("/community/approve/{groupNo}")
    public ResponseEntity<String> approveGroup(@PathVariable int groupNo) {
        boolean success = memberAdminService.approveGroup(groupNo);
        return success ? ResponseEntity.ok("모임 승인 완료") : ResponseEntity.badRequest().body("승인 실패");
    }
    
    @DeleteMapping("/community/reject/{groupNo}")
    public ResponseEntity<String> rejectGroup(@PathVariable int groupNo) {
        System.out.println("거절 요청 - groupNo: " + groupNo);
        boolean success = memberAdminService.rejectGroup(groupNo);

        if (success) {
            return ResponseEntity.ok("모임 신청이 거절되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("삭제 실패 - 존재하지 않는 groupNo");
        }
    }
}
 	