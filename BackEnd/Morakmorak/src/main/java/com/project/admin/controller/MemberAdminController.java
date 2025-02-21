package com.project.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
     * 모든 모임 리스트 조회 (상세내용)
     */
    @GetMapping("/communityDetail/{groupNo}")
    public ResponseEntity<?> getCommunityDetail(@PathVariable int groupNo) {
        try {
            List<Map<String, Object>> communityDetails = memberAdminService.getCommunityDetail(groupNo);
            if (communityDetails == null || communityDetails.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 모임을 찾을 수 없습니다.");
            }
            return ResponseEntity.ok(communityDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("데이터를 불러오는 중 오류가 발생했습니다.");
        }
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
    
    /**
     * 수익 조회
     */
    @GetMapping("/stats/profit")
    public ResponseEntity<List<Map<String, Object>>> getProfit() {
        return ResponseEntity.ok(memberAdminService.getProfit());
    }
    
    /**
     * 성별 조회
     */
    @GetMapping("/stats/gender")
    public ResponseEntity<List<Map<String, Object>>> genderCount() {
        return ResponseEntity.ok(memberAdminService.genderCount());
    }
    /**
     * 연령대 조회
     */
    @GetMapping("/stats/age")
    public ResponseEntity<List<Map<String, Object>>> countAge() {
        return ResponseEntity.ok(memberAdminService.countAge());
    }
    /**
     * 전체 인기 카테고리
     */
    @GetMapping("/stats/popularCategory")
    public ResponseEntity<List<Map<String, Object>>> selectPopularCategory() {
        return ResponseEntity.ok(memberAdminService.selectPopularCategory());
    }
    
    /**
     * 전체 찜많은 모임
     */
    
    /**
     * 전체 방문자 많은 사이트
     */
    @GetMapping("/stats/visitAll")
    public ResponseEntity<List<Map<String, Object>>> countVisitGroup() {
        return ResponseEntity.ok(memberAdminService.countVisitGroup());
    }
    
    /**
     * 최근 한달 인기 카테고리
     */
    
    /**
     * 최근 한달 찜많은 모임
     */
    
    /**
     * 최근 한달 방문자 많은 사이트
     */
}
 	
