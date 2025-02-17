package com.project.group_morak.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.group_morak.service.GroupMorakService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/group")
public class GroupMorakController {
	@Autowired
	private GroupMorakService service;

	@RequestMapping("/insert")
	public ResponseEntity<String> insert(@RequestParam Map<String, Object> map,
			@RequestParam("img_url1") MultipartFile file1,
			@RequestParam(value = "img_url2", required = false) MultipartFile file2,
			@RequestParam(value = "img_url3", required = false) MultipartFile file3) throws Exception {
		try {
			// 파일을 업로드할 폴더 지정
			File directory = new File("D:/community_project/communiy_react/public/images/group_morak");
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
					Path path = Paths.get("D:/community_project/communiy_react/public/images/group_morak/" + fileName);
					log.info("path = " + path);
					Files.copy(file.getInputStream(), path);

					// 클라이언트가 접근할 수 있는 경로 반환
					imgUrls[i] = "group_morak/" + fileName;
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

			// 서비스 호출
			service.insert(map);
			return ResponseEntity.ok("신청이 완료되었습니다. 관리자의 승인 후 모임이 개설됩니다.");
		} catch (Exception e) {
			log.error("Error inserting group", e);
			return ResponseEntity.status(500).body("신청에 실패했습니다.");
		}
	}

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

	@RequestMapping("/detail")
	public Map<String, Object> read(@RequestParam(value = "group_no") String groupNo) throws Exception {
		return service.read(groupNo);
	}

	@RequestMapping("/update")
	public ResponseEntity<String> update(@RequestParam Map<String, Object> map,
			@RequestParam(value = "img_url1", required = false) MultipartFile file1,
			@RequestParam(value = "img_url2", required = false) MultipartFile file2,
			@RequestParam(value = "img_url3", required = false) MultipartFile file3) throws Exception {
		try {
			String groupNo = (String) map.get("group_no");
			String group_title = (String) map.get("group_title");

			// 데이터베이스에서 현재 파일 경로를 조회
			Map<String, Object> currentData = service.read(groupNo);

			String[] existingFilePaths = { (String) currentData.get("IMG_URL1"), (String) currentData.get("IMG_URL2"),
					(String) currentData.get("IMG_URL3") };

			// 파일을 업로드할 폴더 지정
			File directory = new File("D:/community_project/communiy_react/public/images/group_morak");
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
						File existingFile = new File(
								"D:/community_project/communiy_react/public/images/" + existingFilePaths[i]);
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
					String fileName = group_title + "_" + System.currentTimeMillis() + "_" + originalFileName;

					// 이미지 저장 경로
					Path path = Paths.get("D:/community_project/communiy_react/public/images/group_morak/" + fileName);
					Files.copy(file.getInputStream(), path);

					// 클라이언트가 접근할 수 있는 경로 반환
					imgUrls[i] = "group_morak/" + fileName;
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

	@RequestMapping("/join")
	public ResponseEntity<String> statusUpdate(@RequestParam Map<String, Object> map) {
		try {
			service.join(map);
//			service.changePoint(map);
			
			return ResponseEntity.ok("신청이 완료되었습니다. 모임장의 승인 후 활동이 가능합니다.");
		} catch (Exception e) {
			log.error("Error inserting group", e);
			return ResponseEntity.status(500).body("신청에 실패했습니다.");
		}
	}
}