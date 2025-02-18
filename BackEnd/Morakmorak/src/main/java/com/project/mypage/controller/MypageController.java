package com.project.mypage.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.web.servlet.view.RedirectView;
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

import com.project.common.config.SecretConfig;
import com.project.member.model.Member;
import com.project.mypage.model.GroupMember;
import com.project.mypage.model.Notification;
import com.project.mypage.model.TransactionLog;
import com.project.mypage.service.MypageService;

import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/mypage")
@CrossOrigin
public class MypageController {
	private SecretConfig secretConfig = new SecretConfig();
	private static int verifyNum;
	
	@Autowired
	private MypageService service;
	
	
	@GetMapping("/transactionHistory")
	public ResponseEntity<List<TransactionLog>> getUserCoinHistory(@RequestParam("no") int no) {
		List<TransactionLog> historyList = service.selectTransactionLog(no);
		return ResponseEntity.ok(historyList);
	}

	@PostMapping(value = "/profileupdate")
	public ResponseEntity<?> insertReview2(@RequestParam Map<String, Object> map,
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



	@GetMapping("/charge/{no}")
	public RedirectView chargePoint(
	        @PathVariable int no,
	        @RequestParam("amount") int amount,
	        @RequestParam("orderId") String orderId) {

	    if (!orderId.equals(secretConfig.getTossId())) {
	        // 실패 시 프론트엔드의 실패 페이지로 리디렉트
	        return new RedirectView("http://localhost:5173/mypage/checkout/fail/" + no);
	    }

	    try {
	        Member member = new Member();
	        member.setMoney(amount);
	        member.setNo(no);
	        service.chargeAmount(member);

	        // 성공 시 프론트엔드의 성공 페이지로 리디렉트
	        return new RedirectView("http://localhost:5173/mypage/checkout/success/" + no+"?"+"amount="+amount);
	    } catch (Exception e) {
	        // 실패 시 프론트엔드의 실패 페이지로 리디렉트
	        return new RedirectView("http://localhost:5173/mypage/checkout/fail/" + no);
	    }
	}


	@GetMapping("/group/{no}")
	public ResponseEntity<List<List<GroupMember>>> getUserMeetings(@PathVariable int no) {
		List<List<GroupMember>> meetings = service.getGroupMembers(no);
		return ResponseEntity.ok(meetings);
	}
	
	@PostMapping("/email")
	public void sendEmail(@RequestParam("email") String email,@RequestParam("no") String no) {
	
		verifyNum = (int)(Math.random()*(1000000-100000+1)+100000);
		try {
			System.out.println("메세지 전송시도");
			service.sendEmail(email, verifyNum);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		
	}
	
	@RequestMapping("/email/number")
	public int sendNumber() {
		System.out.println(verifyNum);
		return verifyNum;
	}
	
	 @GetMapping("/notification/{no}")
	    public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable int no) {
	        List<Notification> notifications = service.selectNotification(no);
	        System.out.println(notifications);
	        return ResponseEntity.ok(notifications);
	    }
	 
	 @GetMapping("/showMore")
	 public ResponseEntity<String> handleShowMore(@RequestBody Map<String, Object> requestData) {
	        try {
	            // userId 추출
	        	int no = (int) requestData.get("no");
	        	service.readNotification(no);
	            return ResponseEntity.ok("notification 읽기 성공");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
	        }
	    }
}
