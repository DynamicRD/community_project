package com.project.group_morak.controller;

import java.io.Console;
import java.io.File;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.group_morak.model.GroupMorak;
import com.project.group_morak.service.GroupMorakService;
import com.project.mypage.model.TransactionLog;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/group")
public class GroupMorakController {

	@Autowired
	private GroupMorakService service;

	// 모임 개설 신청
	@RequestMapping("/insert")
	public ResponseEntity<String> insert(@RequestParam Map<String, Object> map,
			@RequestParam("img_url1") MultipartFile file1,
			@RequestParam(value = "img_url2", required = false) MultipartFile file2,
			@RequestParam(value = "img_url3", required = false) MultipartFile file3) throws Exception {
		try {
			String uploadPath = Paths.get("src/main/resources/static/upload").toAbsolutePath().toString() + "/";
			// 파일을 업로드할 폴더 지정
			File directory = new File(uploadPath);
			if (!directory.exists()) {
				directory.mkdirs();
			}

			// 파일 업로드 처리
			String[] imgUrls = new String[3];
			MultipartFile[] files = { file1, file2, file3 };

			for (int i = 0; i < files.length; i++) {
				MultipartFile file = files[i];
				if (file != null && !file.isEmpty()) {
					// 파일 이름 지정 (현재 시간 + 원본 확장자)
					String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
					String fileName = System.currentTimeMillis() + "_" + originalFileName;

					// 이미지 저장 경로
					Path path = Paths.get(uploadPath + fileName);
					log.info("path = " + path);
					Files.copy(file.getInputStream(), path);

					// 클라이언트가 접근할 수 있는 경로 반환
					imgUrls[i] = fileName;
				}
			}

			// 각각의 이미지를 map에 저장
			map.put("img_url1", imgUrls[0]);
			map.put("img_url2", imgUrls[1]);
			map.put("img_url3", imgUrls[2]);
			
			System.out.println(imgUrls[0]);
			System.out.println(imgUrls[1]);
			System.out.println(imgUrls[2]);
			// 날짜 처리
			String startDateStr = (String) map.get("start_date");
			String lastDateStr = (String) map.get("last_date");

			DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
			LocalDateTime startDate = LocalDateTime.parse(startDateStr, formatter);
			LocalDateTime lastDate = LocalDateTime.parse(lastDateStr, formatter);

			// UTC -> KST 변환
			ZonedDateTime startDateKST = startDate.atZone(ZoneId.of("UTC"))
					.withZoneSameInstant(ZoneId.of("Asia/Seoul"));
			ZonedDateTime lastDateKST = lastDate.atZone(ZoneId.of("UTC")).withZoneSameInstant(ZoneId.of("Asia/Seoul"));

			map.put("start_date", Timestamp.valueOf(startDateKST.toLocalDateTime()));
			map.put("last_date", Timestamp.valueOf(lastDateKST.toLocalDateTime()));

			// 서비스 호출
			service.insert(map);
			service.insertLeader(map);
			System.out.println(map);
			return ResponseEntity.ok("신청이 완료되었습니다. 관리자의 승인 후 모임이 개설됩니다.");
		} catch (Exception e) {
			log.error("Error inserting group", e);
			return ResponseEntity.status(500).body("신청에 실패했습니다.");
		}
	}

	// 모임 리스트
	@GetMapping("/list")
	public List<Map<String, Object>> list(@RequestParam(value = "type") String type) throws Exception {
		List<Map<String, Object>> data = service.list(type);

		// Convert UTC to KST
		for (Map<String, Object> item : data) {
			String startDate = (String) item.get("start_date");
			if (startDate != null) {
				ZonedDateTime startDateKST = ZonedDateTime
						.parse(startDate, DateTimeFormatter.ISO_DATE_TIME.withZone(ZoneId.of("UTC")))
						.withZoneSameInstant(ZoneId.of("Asia/Seoul"));
				item.put("start_date", startDateKST.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
			}

			String lastDate = (String) item.get("last_date");
			if (lastDate != null) {
				ZonedDateTime lastDateKST = ZonedDateTime
						.parse(lastDate, DateTimeFormatter.ISO_DATE_TIME.withZone(ZoneId.of("UTC")))
						.withZoneSameInstant(ZoneId.of("Asia/Seoul"));
				item.put("last_date", lastDateKST.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
			}
		}
		return data;
	}

	// 모임 상세
	@RequestMapping("/detail")
	public Map<String, Object> read(@RequestParam(value = "group_no") String groupNo) throws Exception {
		Map<String, Object> map = service.read(groupNo);
		Map<String, Object> map2 = service.countGroupMember(groupNo);
		map.put("MEMBER_COUNT", map2.get("MEMBER_COUNT"));
		return map;
	}

	// 모임 정보 수정
	@RequestMapping("/update")
	public ResponseEntity<String> update(@RequestParam Map<String, Object> map,
			@RequestParam(value = "img_url1", required = false) MultipartFile file1,
			@RequestParam(value = "img_url2", required = false) MultipartFile file2,
			@RequestParam(value = "img_url3", required = false) MultipartFile file3) throws Exception {
		try {
			String groupNo = (String) map.get("group_no");

			// 데이터베이스에서 현재 파일 경로를 조회
			Map<String, Object> currentData = service.read(groupNo);

			String[] existingFilePaths = { (String) currentData.get("IMG_URL1"), (String) currentData.get("IMG_URL2"),
					(String) currentData.get("IMG_URL3") };

			String uploadPath = Paths.get("src/main/resources/static/upload").toAbsolutePath().toString() + "/";
			// 파일을 업로드할 폴더 지정
			File directory = new File(uploadPath);
			if (!directory.exists()) {
				directory.mkdirs();
			}

			// 파일 업로드 처리 (새로운 파일들)
			String[] imgUrls = new String[3];
			MultipartFile[] files = { file1, file2, file3 };

			for (int i = 0; i < files.length; i++) {
				MultipartFile file = files[i];
				// 기존 파일 경로가 있고 새 파일이 업로드될 경우 기존 파일 삭제
				if (file != null && !file.isEmpty()) {
					if (existingFilePaths[i] != null && !existingFilePaths[i].isEmpty()) {
						// 기존 이미지 파일 삭제
						File existingFile = new File(uploadPath + existingFilePaths[i]);
						if (existingFile.exists()) {
							boolean deleted = existingFile.delete();
							if (deleted) {
								log.info("삭제된 파일: " + existingFilePaths[i]);
							} else {
								log.warn("파일 삭제 실패: " + existingFilePaths[i]);
							}
						}
					}

					// 새 파일 업로드 처리
					String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
					String fileName = System.currentTimeMillis() + "_" + originalFileName;

					// 이미지 저장 경로
					Path path = Paths.get(uploadPath + fileName);
					Files.copy(file.getInputStream(), path);

					// 클라이언트가 접근할 수 있는 경로 반환
					imgUrls[i] = fileName;
				} else {
					// 파일이 업로드되지 않은 경우 기존 파일 경로 유지
					imgUrls[i] = existingFilePaths[i];
				}
			}

			// 각각의 이미지를 map에 저장
			map.put("img_url1", imgUrls[0]);
			map.put("img_url2", imgUrls[1]);
			map.put("img_url3", imgUrls[2]);

			// 날짜 처리
			String startDateStr = (String) map.get("start_date");
			String lastDateStr = (String) map.get("last_date");

			DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
			LocalDateTime startDate = LocalDateTime.parse(startDateStr, formatter);
			LocalDateTime lastDate = LocalDateTime.parse(lastDateStr, formatter);

			// UTC -> KST 변환
			ZonedDateTime startDateKST = startDate.atZone(ZoneId.of("UTC"))
					.withZoneSameInstant(ZoneId.of("Asia/Seoul"));
			ZonedDateTime lastDateKST = lastDate.atZone(ZoneId.of("UTC")).withZoneSameInstant(ZoneId.of("Asia/Seoul"));

			map.put("start_date", Timestamp.valueOf(startDateKST.toLocalDateTime()));
			map.put("last_date", Timestamp.valueOf(lastDateKST.toLocalDateTime()));

			// 서비스 호출 (DB 업데이트)
			service.update(map);
			return ResponseEntity.ok("수정이 완료되었습니다.");
		} catch (Exception e) {
			log.error("Error updating group", e);
			return ResponseEntity.status(500).body("수정에 실패했습니다.");
		}
	}

	// 모임 참가 신청
	@RequestMapping("/join")
	public ResponseEntity<String> join(@RequestParam Map<String, Object> map) {
		try {
			service.join(map);
			service.changeMoney(map);
			return ResponseEntity.ok("신청이 완료되었습니다. 모임장의 승인 후 활동이 가능합니다.");
		} catch (DataIntegrityViolationException e) { // 유니크 제약 조건 위반 예외 처리
			log.error("Duplicate basket entry", e);
			return ResponseEntity.status(400).body("이미 신청한 모임입니다.");
		} catch (Exception e) {
			log.error("Error inserting group", e);
			return ResponseEntity.status(500).body("신청에 실패했습니다.");
		}
	}
	
	// 모임 시작일 비교
	@RequestMapping("/checkStartDate")
	public String checkStartDate(@RequestParam(value = "group_no") String groupNo) {
			return service.checkStartDate(groupNo);
	}
	
	// 모임 참가 신청 취소
	@RequestMapping("/cancelJoin")
	public ResponseEntity<String> cancelJoin(@RequestParam Map<String, Object> map) {
		try {
			service.cancelJoin(map);
			service.refundMoney(map);
			System.out.println(map);
			if (map.get("status") != null && map.get("status").equals("MEMBER")) {
			    service.memberCountCancel(map);
			}
			log.info("status="+map.get("status"));
//			TransactionLog transactionLog = new TransactionLog();
//			transactionLog.setAmount(map.get(money));
//			transactionLog.setNo(member.getNo());
//			transactionLog.setType("환불");
//		    System.out.println("거래내역 로그"+transactionLog);
//			mapper.insertHistory(transactionLog);
			return ResponseEntity.ok("신청이 취소되었습니다. 포인트가 환불되었습니다.");
		} catch (Exception e) {
			log.error("Error calceling ", e);
			return ResponseEntity.status(500).body("처리에 실패했습니다.");
		}
	}
	

	// 모임 찜목록에 저장
	@RequestMapping("/basket")
	public ResponseEntity<String> insertBasket(@RequestParam Map<String, Object> map) {
		try {
			service.insertBasket(map);
			return ResponseEntity.ok("찜 목록에 저장되었습니다.");
		} catch (DataIntegrityViolationException e) { // 유니크 제약 조건 위반 예외 처리
			log.error("Duplicate basket entry", e);
			return ResponseEntity.status(400).body("이미 찜한 모임입니다.");
		} catch (Exception e) {
			log.error("Error inserting group", e);
			return ResponseEntity.status(500).body("처리에 실패했습니다.");
		}
	}


	// 모임 멤버 리스트
	@RequestMapping("/memberList")
	public List<Map<String, Object>> memberList(@RequestParam(value = "group_no") String groupNo) {
		return service.memberList(groupNo);
	}


	// 모임 권한 추출
	@RequestMapping("/auth")
	public String groupAuth(@RequestParam Map<String, Object> map) {
		return service.groupAuth(map);
	}

	// 최대 모임원 필터
	@RequestMapping("/applicable")
	public Map<String, Object> applicable(@RequestParam(value = "group_no") String groupNo) {
	    Map<String, Object> map = service.countGroupMember(groupNo);
	    Map<String, Object> map2 = service.read(groupNo);
	    map.put("START_DATE", map2.get("START_DATE"));
	    
	    return map;
	}
	
	// 모임 모집 종료 여부
	@RequestMapping("/isClosed")
	public boolean isClosed(@RequestParam(value = "group_no") String groupNo) {
	    Map<String, Object> map = service.read(groupNo);
	    
	    // BigDecimal을 int로 변환
	    BigDecimal memberCountBigDecimal = (BigDecimal) map.get("MEMBER_COUNT");
	    BigDecimal userMaxBigDecimal = (BigDecimal) map.get("USER_MAX");

	    int memberCount = memberCountBigDecimal.intValue();  // BigDecimal을 int로 변환
	    int userMax = userMaxBigDecimal.intValue();  // BigDecimal을 int로 변환
	    
	    // START_DATE를 java.sql.Date로 변환
	    Object startDateObj = map.get("START_DATE");
	    LocalDate startDate = null;
	    
	    if (startDateObj instanceof java.sql.Date) {
	        startDate = ((java.sql.Date) startDateObj).toLocalDate();  // java.sql.Date에서 LocalDate로 변환
	    } else if (startDateObj instanceof java.sql.Timestamp) {
	        startDate = ((java.sql.Timestamp) startDateObj).toLocalDateTime().toLocalDate();  // java.sql.Timestamp에서 LocalDate로 변환
	    }

	    if (startDate == null) {
	        // 적절한 처리가 필요할 수 있음 (예: 예외 처리)
	        throw new IllegalStateException("START_DATE is invalid");
	    }

	    // 현재 날짜를 LocalDate로 가져오기
	    LocalDate today = LocalDate.now();

	    // 모임이 종료된 경우 (회원 수가 최대값을 초과하거나 시작일이 오늘이거나 오늘 이전)
	    if (memberCount >= userMax || !startDate.isAfter(today)) {
	        return true;  // 모임 종료
	    }

	    return false;  // 모임 종료되지 않음
	}

	
	// 모임장 멤버 승인/거부 처리
	@RequestMapping("/statusUpdate")
	public ResponseEntity<String> memberStatusUpdate(@RequestParam Map<String, Object> map) {
		try {
			service.memberStatusUpdate(map);
			if ("REJECT".equals(map.get("status"))) {
				service.refundMoney(map);
			}else {
				service.memberCount(map);
			}
			return ResponseEntity.ok("처리가 완료되었습니다.");
		} catch (Exception e) {
			log.error("Error group member status updating ", e);
			return ResponseEntity.status(500).body("처리에 실패했습니다.");
		}
	}


	// 모임 멤버 신고
	@RequestMapping("/memberReport")
	public ResponseEntity<String> memberReport(@RequestParam Map<String, Object> map) {
		try {
			service.memberReport(map);
			return ResponseEntity.ok("처리가 완료되었습니다.");
		} catch (Exception e) {
			log.error("Error member Reporting ", e);
			return ResponseEntity.status(500).body("처리에 실패했습니다.");
		}
	}

	@GetMapping("/mainselect")
	public List<GroupMorak> getGroups(@RequestParam(defaultValue = "all") String category) {
		return service.getGroupsByCategory(category);
	}
	
	@GetMapping("/detailselect")
	public List<GroupMorak> getDetailGroups(@RequestParam(defaultValue = "all") String category) {
		System.out.println(service.getGroupsByCategory3(category));
		return service.getGroupsByCategory3(category);
	}
	
	

}