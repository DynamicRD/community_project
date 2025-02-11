package com.project.member.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.member.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/member")
@CrossOrigin
public class MemberController {
	
	@Autowired
	private MemberService memberService;

	@PostMapping("/kakao")
	public ResponseEntity<?> kakaoLogin(@RequestBody Map<String, String> request) {
		Map<String, String> tokens = memberService.kakaoLogin(request.get("accessToken"));

		ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", tokens.get("refreshToken"))
				.httpOnly(true).secure(true).path("/").maxAge(604800).build();

		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + tokens.get("accessToken")).body("Login Successful");
	}
	// ===============================================================================================

//    @Autowired
//    private MemberService service;
//    @Autowired
//	private JwtUtil JwtUtil;
//    
//    @GetMapping("/duplicatecheck")
//    public Map<String, Boolean> checkDuplicate(@RequestParam("userId") String userId) { // "userId"로 변경
//        Member member = new Member();
//        member.setId(userId);
//
//        boolean isDuplicate = service.duplicateCheck(member);
//        
//        Map<String, Boolean> response = new HashMap<>();
//        response.put("isDuplicate", isDuplicate);
//        
//        return response;
//        
//    }
//    
//    @GetMapping("/nickduplicatecheck")
//    public Map<String, Boolean> checknickDuplicate(@RequestParam("nickname") String nickname) { // "userId"로 변경
//    	System.out.println(nickname);
//    	Member member = new Member();
//    	member.setNickname(nickname);
//    	
//    	boolean isDuplicate = service.nickDuplicateCheck(member);
//    	
//    	Map<String, Boolean> response = new HashMap<>();
//    	response.put("isDuplicate", isDuplicate);
//    	
//    	return response;
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<?> registerMember(@RequestBody MemberDTO memberDTO) {
//        try {
//            // 회원가입 로직 처리 (예: DB 저장)
//            service.register(memberDTO);
//            return ResponseEntity.ok().body(Collections.singletonMap("message", "회원가입 성공"));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                .body(Collections.singletonMap("message", "회원가입 실패: " + e.getMessage()));
//        }
//    }
//    
// // 로그인 처리
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, Object>> login(@RequestBody Member member, HttpServletResponse response) {
//        
//        if (member.getPw() == null) {
//            member.setPw("none");
//        }
//        if (member.getProvider() == null) {
//        	member.setProvider("none");
//        }
//        
//		
//        log.info("🔹 /login 요청 - 유저 ID: {}", member.getId());
//        System.out.println(member);
//        // DB에서 사용자 확인
//        Member member2 = service.loginCheck(member);
//        System.out.println(member2);
//        if (member2 == null) {
//            return ResponseEntity.status(404).body(Map.of(
//                "success", false,
//                "message", "등록되지 않은 사용자입니다. 회원가입이 필요합니다."
//            ));
//        }
//        System.out.println(member2);
//        deleteJwtCookie(response, "refresh_token"); // 기존 리프레시 토큰 삭제
//
//        // JWT 생성
//        String accessToken = JwtUtil.createAccessToken(member2);
//        String refreshToken = JwtUtil.createRefreshToken(member2);
//        log.info("✅ JWT 생성 완료");
//
//        // JWT를 HttpOnly 쿠키에 저장
//        addJwtCookie(response, "jwt", accessToken, 60 * 15); // 15분 유지
//        addJwtCookie(response, "refresh_token", refreshToken, 60 * 60 * 24 * 7); // 7일 유지
//
//        // JSON 응답에 액세스 토큰도 포함 (React에서 사용 가능)
//        return ResponseEntity.ok(Map.of(
//            "success", true,
//            "message", "로그인 성공!",
//            "accessToken", accessToken // JSON 응답에 추가
//        ));
//    }
//
//
// 	//--------------------------------------------------api메소드가 아닌 컨트롤러용 메소드
// 		//  JWT 쿠키 삭제 메소드
// 		private void deleteJwtCookie(HttpServletResponse response, String name) {
// 		    Cookie cookie = new Cookie(name, "");
// 		    cookie.setHttpOnly(true);
// 		    cookie.setSecure(true);
// 		    cookie.setPath("/");
// 		    cookie.setMaxAge(0); // 즉시 삭제
// 		    response.addCookie(cookie);
// 		}
//
// 		//  공통 메소드: JWT를 HttpOnly 쿠키에 저장
// 		private void addJwtCookie(HttpServletResponse response, String name, String token, int maxAge) {
// 			Cookie cookie = new Cookie(name, token);
// 			cookie.setHttpOnly(true);
// 			cookie.setSecure(true);
// 			cookie.setPath("/");
// 			cookie.setMaxAge(maxAge);
// 			cookie.setAttribute("SameSite", "Strict"); // XSRF 방지
// 			response.addCookie(cookie);
// 		}
}
