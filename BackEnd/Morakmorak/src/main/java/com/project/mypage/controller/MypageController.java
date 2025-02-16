package com.project.mypage.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.member.model.Member;
import com.project.mypage.model.GroupMember;
import com.project.mypage.model.TransactionLog;
import com.project.mypage.service.MypageService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/mypage")
@CrossOrigin
public class MypageController {
	@Autowired
	private MypageService service;

    @GetMapping("/transactionHistory")
    public ResponseEntity<List<TransactionLog>> getUserCoinHistory(@RequestParam("no") int no) {
        List<TransactionLog> historyList = service.selectTransactionLog(no);
        return ResponseEntity.ok(historyList);
    }

    
    @PostMapping(value = "/profileupdate")
    public ResponseEntity<?> insertReview2(
            @RequestParam Map<String, Object> map,
            @RequestParam("image") MultipartFile file) throws Exception {
        
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("파일을 선택해 주세요.");
        }

        // 저장할 파일 이름 지정 (UUID + 원본 확장자)
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String fileName = UUID.randomUUID().toString() + fileExtension;

        // 업로드 폴더 경로 설정
        String uploadDir = "D:/community_project/communiy_react/public/images/";
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 이미지 저장 경로 설정
        Path path = Paths.get(uploadDir + fileName);
        log.info("파일 저장 경로: " + path);

        // 파일 저장 (덮어쓰기 방지 옵션 추가)
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        // 클라이언트가 접근할 수 있는 경로 반환
        map.put("fileName", fileName);
        service.insertProfile(map);

        return ResponseEntity.ok("파일 업로드 성공: " + fileName);
    }
    
	@PostMapping("/charge")
    public ResponseEntity<?> chargePoint(@RequestBody Member member) {
        try {
            service.chargeAmount(member);
            return ResponseEntity.ok().body("포인트 충전 완료");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("충전 실패: " + e.getMessage());
        }
    }
	
	 @GetMapping("/group/{no}")
	    public ResponseEntity<List<GroupMember>> getUserMeetings(@PathVariable int no) {
	        List<GroupMember> meetings = service.getGroupMembers(no);
	        return ResponseEntity.ok(meetings);
	    }
}
