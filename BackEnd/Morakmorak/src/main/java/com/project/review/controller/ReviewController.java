package com.project.review.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.review.service.ReviewService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/review")
public class ReviewController {

	@Autowired
	private ReviewService service;

	// 이전 BLOB방식 혹시몰라서 남겨둠
//	@PostMapping(value = "/insert")
//	public ResponseEntity<?> insertReview(@RequestParam Map<String, Object> map,
//			@RequestParam("file") MultipartFile file) throws Exception {
//		try {
//			// 파일을 byte[]로 받기
//			byte[] fileBytes = file.getBytes();
//
//			// 나머지 데이터도 Map에 넣어주기 (제목, 내용, 별점 등)
//			String title = map.get("title").toString();
//			String content = map.get("content").toString();
//			String star = map.get("star").toString();
//
//			// Map에 imageUrl 값을 넣기 (BLOB 파일 데이터)
//			map.put("imageUrl", fileBytes); // map에 BLOB 데이터 저장
//			map.put("title", title);
//			map.put("content", content);
//			map.put("star", star);
//
//			// 서비스 호출 (매퍼에 map 객체 전달)
//			service.insertReview(map); // map을 서비스로 전달
//
//			// 성공적인 응답을 React로 반환
//			Map<String, Object> response = Map.of("message", "파일 업로드 성공");
//			return ResponseEntity.ok(response); // 응답 반환
//
//		} catch (IOException e) {
//			// 오류 발생 시 응답
//			return ResponseEntity.status(500).body("파일 업로드 실패: " + e.getMessage());
//		} catch (Exception e) {
//			// 예외 처리: 로그를 통해 어떤 오류인지 확인
//			return ResponseEntity.status(500).body("서버 처리 중 오류가 발생했습니다: " + e.getMessage());
//		}
//	}

	@PostMapping(value = "/insert")
	public void insertReview2(@RequestParam Map<String, Object> map, @RequestParam("image") MultipartFile file)
			throws Exception {
		if (file.isEmpty()) {
			ResponseEntity.status(HttpStatus.BAD_REQUEST).body("파일을 선택해 주세요.");
		}

		// 저장할 파일 이름 지정 (현재 시간 + 원본 확장자)
		String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
		String fileName = System.currentTimeMillis() + "_" + originalFileName;

		// 업로드 폴더가 없으면 생성
		File directory = new File("D:/community_project/communiy_react/public/images/");
		if (!directory.exists()) {
			directory.mkdirs();
		}

		// 이미지 저장 경로
		Path path = Paths.get("D:/community_project/communiy_react/public/images/" + fileName);
		log.info("path = " + path);
		Files.copy(file.getInputStream(), path);

		// 클라이언트가 접근할 수 있는 경로 반환
		String imageUrl = fileName;
		ResponseEntity.ok("파일 업로드 성공: " + imageUrl);
		map.put("fileName", fileName);
		service.insertReview(map);
	}

	// 이전 BLOB방식 혹시몰라서 남겨둠
//	@GetMapping(value = "/list")
//	public List<Map<String, Object>> listReview() throws Exception {
//		List<Map<String, Object>> listMap = service.listReview();
//
//		// BLOB 데이터를 Base64로 변환
//		for (Map<String, Object> map : listMap) {
//			if (map.containsKey("IMG_URL")) {
//				Object imgUrl = map.get("IMG_URL");
//				if (imgUrl instanceof Blob) {
//					Blob blob = (Blob) imgUrl;
//					byte[] byteArray = blob.getBytes(1, (int) blob.length());
//					String base64Img = Base64.getEncoder().encodeToString(byteArray);
//					map.put("IMG_URL", base64Img); // Base64로 변환하여 넣기
//				}
//			}
//		}
//
//		return listMap;
//	}

	@GetMapping(value = "/list")
	public List<Map<String, Object>> list2() throws Exception {
		List<Map<String, Object>> listMap = service.listReview();
		return listMap;
	}

	@GetMapping(value = "/read/{idx}")
	public Map<String, Object> readReview2(@PathVariable(name = "idx") int idx) throws Exception {
		Map<String, Object> listMap = service.readReview(idx);
		log.info("info = " + listMap);
		return listMap;
	}

	// 이전 BLOB방식 혹시몰라서 남겨둠
//	@GetMapping(value = "/read/{idx}")
//	public Map<String, Object> readReview(@PathVariable(name = "idx") int idx) throws Exception {
//		Map<String, Object> listMap = service.readReview(idx);
//
//		// BLOB 데이터를 Base64로 변환
//		if (listMap.containsKey("IMG_URL")) {
//			Object imgUrl = listMap.get("IMG_URL");
//			if (imgUrl instanceof Blob) {
//				Blob blob = (Blob) imgUrl;
//				byte[] byteArray = blob.getBytes(1, (int) blob.length());
//				String base64Img = Base64.getEncoder().encodeToString(byteArray);
//				listMap.put("IMG_URL", base64Img); // Base64로 변환하여 넣기
//			}
//		}
//		log.info("listMap = " + listMap);
//		return listMap;
//	}

	@PostMapping(value = "/reply/insert")
	public void replyInsert(@RequestParam Map<String, Object> map) throws Exception {
		log.info("Controller" + map);
		service.replyInsert(map);
	}
	
	@GetMapping(value = "/reply/list")
	public List<Map<String, Object>> replyList() throws Exception {
		return service.replyList();
	}

}
