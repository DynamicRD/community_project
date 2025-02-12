package com.project.member.controller;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.member.model.Member;
import com.project.member.model.MemberDTO;
import com.project.member.service.MemberService;
import com.project.common.config.JwtTokenProvider;
import com.project.common.config.JwtUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/member")
@CrossOrigin
public class MemberController {
	@Autowired
	private MemberService service;
	@Autowired
	private JwtUtil JwtUtil;
	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	// 카카오?
	@PostMapping("/kakao")
	public ResponseEntity<?> kakaoLogin(@RequestBody Map<String, String> request) {
		Map<String, String> tokens = service.kakaoLogin(request.get("accessToken"));

		ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", tokens.get("refreshToken"))
				.httpOnly(true).secure(true).path("/").maxAge(604800).build();

		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + tokens.get("accessToken")).body("Login Successful");
	}

	// 아이디 중복 확인
	@GetMapping("/duplicatecheck")
	public Map<String, Boolean> checkDuplicate(@RequestParam("userId") String userId) { // "userId"로 변경
		Member member = new Member();
		member.setId(userId);

		boolean isDuplicate = service.duplicateCheck(member);

		Map<String, Boolean> response = new HashMap<>();
		response.put("isDuplicate", isDuplicate);

		return response;

	}

	// 닉네임 중복 확인
	@GetMapping("/nickduplicatecheck")
	public Map<String, Boolean> checknickDuplicate(@RequestParam("nickname") String nickname) { // "userId"로 변경
		System.out.println(nickname);
		Member member = new Member();
		member.setNickname(nickname);

		boolean isDuplicate = service.nickDuplicateCheck(member);

		Map<String, Boolean> response = new HashMap<>();
		response.put("isDuplicate", isDuplicate);

		return response;
	}

	// 회원가입 진행
	@PostMapping("/register")
	public ResponseEntity<?> registerMember(@RequestBody MemberDTO memberDTO) {
		try {
			// 회원가입 로직 처리 (예: DB 저장)
			service.register(memberDTO);
			return ResponseEntity.ok().body(Collections.singletonMap("message", "회원가입 성공"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(Collections.singletonMap("message", "회원가입 실패: " + e.getMessage()));
		}
	}

	// 전화번호 중복 확인
	@PostMapping("/phoneduplicatecheck")
	public Map<String, Boolean> phoneDuplicateCheck(@RequestBody MemberDTO memberDTO) {
		Map<String, Boolean> response = new HashMap<>();

		if (service.phoneDuplicateCheck(memberDTO)) {
			response.put("isPhoneDuplicate", true);
		} else {
			response.put("isPhoneDuplicate", false);
		}

		return response;

	}

	// 로그인시 토큰 2개를 발급해준다
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Member member, HttpServletResponse response) {

		if (member.getPw() == null) {
			member.setPw("none");
		}
		if (member.getProvider() == null) {
			member.setProvider("none");
		}

		log.info("🔹 /login 요청 - 유저 ID: {}", member.getId());
		System.out.println(member);
		// DB에서 사용자 확인
		Member member2 = service.loginCheck(member);
		System.out.println(member2);
		if (member2 == null) {
			return ResponseEntity.status(404).body(Map.of("success", false, "message", "등록되지 않은 사용자입니다. 회원가입이 필요합니다."));
		}
		System.out.println(member2);
		deleteJwtCookie(response, "refresh_token"); // 기존 리프레시 토큰 삭제

		// JWT 생성
		String accessToken = JwtUtil.createAccessToken(member2);
		String refreshToken = JwtUtil.createRefreshToken(member2, member.isRememberMe());

		log.info("✅ JWT 생성 완료");

		// JWT를 HttpOnly 쿠키에 저장
		addSessionJwtCookie(response, "access_token", accessToken); // 끄면 삭제
		if (member.isRememberMe()) {
			addJwtCookie(response, "refresh_token", refreshToken, 60 * 60 * 24 * 7); // 7일 유지
			System.out.println("로그인체크됨");
		} else {
			addSessionJwtCookie(response, "refresh_token", refreshToken); // 끄면 삭제
			System.out.println("로그인체크안됨");

		}
		// JSON 응답에 액세스 토큰도 포함 (React에서 사용 가능)
		return ResponseEntity.ok(Map.of("success", true, "message", "로그인 성공!"));
	}



	//리프레시 토큰 유효시간 검증
	 @GetMapping("/refresh_check")
	    public ResponseEntity<?> checkRefreshToken(@CookieValue(value = "refresh_Token", required = false) String refreshToken,HttpServletResponse response) {
		 if (refreshToken == null || !jwtTokenProvider.validateToken(refreshToken)) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
			}
	        String id = jwtTokenProvider.getIdFromToken(refreshToken);
			Member member = new Member();
			member.setId(id);
			
			//id로 DB에 멤버정보를 긁어온다
			member = service.selectMemberByNo(member);
	        Date expiration = jwtTokenProvider.getExpirationDate(refreshToken);
	        long remainingTime = expiration.getTime() - System.currentTimeMillis();

	        if (remainingTime < 10 * 60 * 1000) { //10분 이하 남았을 경우
	        	return  refreshTwoToken(member,response);
	        	
	        }else {
	        	return refreshAccessToken(member,response);
	        }
	    }
	 
	 
	 @GetMapping("/getdata")
	 public ResponseEntity<Map<String, Object>> getRole(
	         @CookieValue(value = "access_token", required = false) String accessToken,
	         HttpServletResponse response) {

	     // 액세스 토큰 검증
	     if (accessToken == null || !jwtTokenProvider.validateToken(accessToken)) {
	         return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                 .body(Map.of("success", false, "message", "Invalid access token"));
	     }
	     System.out.println("실행되었습니다");
	     // 토큰에서 ID 추출
	     System.out.println(accessToken);
	     int no = jwtTokenProvider.getNoFromToken(accessToken);
	     // DB에서 회원 정보 조회
	     Member member = new Member();
	     member.setNo(no);
	     System.out.println("no값은 "+no);
	     try {
	         // DB에서 회원 정보 조회
	         member = service.selectMemberByNo(member);
	       
	         if (member == null) {
	             return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                     .body(Map.of("success", false, "message", "회원 정보를 찾을 수 없습니다."));
	         }

	         // JSON 응답 생성
	         Map<String, Object> responseData = Map.of(
	                 "success", true,
	                 "message", "로그인 성공!",
	                 "member", member
	         );
	         System.out.println("멤버 데이터: " + member);
	         return ResponseEntity.ok(responseData);
	     } catch (Exception e) {
	         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                 .body(Map.of("success", false, "message", "서버 오류 발생"));
	     }
	 }
	 
	 @GetMapping("/check_tokens")
	 public ResponseEntity<Map<String, Boolean>> checkTokens(
	         @CookieValue(value = "access_token", required = false) String accessToken,
	         @CookieValue(value = "refresh_token", required = false) String refreshToken) {

	     boolean accessTokenExists = accessToken != null;
	     boolean refreshTokenExists = refreshToken != null;
	     System.out.println(accessTokenExists);
	     return ResponseEntity.ok(Map.of(
	         "accessTokenExists", accessTokenExists,
	         "refreshTokenExists", refreshTokenExists
	     ));
	 }
	 
	 @PostMapping("/logout")
	    public ResponseEntity<Map<String, Object>> logout(HttpServletResponse response) {
	        // 쿠키 삭제 (빈 값과 만료 시간 설정)
	        Cookie accessTokenCookie = new Cookie("access_token", null);
	        accessTokenCookie.setMaxAge(0);
	        accessTokenCookie.setPath("/");
	        accessTokenCookie.setHttpOnly(true);

	        Cookie refreshTokenCookie = new Cookie("refresh_token", null);
	        refreshTokenCookie.setMaxAge(0);
	        refreshTokenCookie.setPath("/");
	        refreshTokenCookie.setHttpOnly(true);

	        response.addCookie(accessTokenCookie);
	        response.addCookie(refreshTokenCookie);

	        return ResponseEntity.ok(Map.of("success", true, "message", "로그아웃 성공"));
	    }
	 
	// --------------------------------------------------api메소드가 아닌 컨트롤러용 메소드
		//액세스 토큰 재발급
		public ResponseEntity<?> refreshAccessToken(Member member,HttpServletResponse response) {
			
			String accessToken = JwtUtil.createAccessToken(member);
			
			addSessionJwtCookie(response, "access_token", accessToken); // 끄면 삭제
			return ResponseEntity.ok(Map.of("success", true, "message", "액세스토큰 재발급 성공!"));
		}
		
		//둘다 재발급
		public ResponseEntity<Map<String, Object>> refreshTwoToken(Member member, HttpServletResponse response) {

			if (member.getPw() == null) {
				member.setPw("none");
			}
			if (member.getProvider() == null) {
				member.setProvider("none");
			}

			System.out.println(member);
			// DB에서 사용자 확인
			Member member2 = service.loginCheck(member);
			System.out.println(member2);
			if (member2 == null) {
				return ResponseEntity.status(404).body(Map.of("success", false, "message", "등록되지 않은 사용자입니다. 회원가입이 필요합니다."));
			}
			System.out.println(member2);
			deleteJwtCookie(response, "refresh_token"); // 기존 리프레시 토큰 삭제

			// JWT 생성
			String accessToken = JwtUtil.createAccessToken(member2);
			String refreshToken = JwtUtil.createRefreshToken(member2,true);

			log.info("✅ JWT 생성 완료");

			// JWT를 HttpOnly 쿠키에 저장
			addSessionJwtCookie(response, "access_token", accessToken); // 끄면 삭제
			addJwtCookie(response, "refresh_token", refreshToken, 60 * 60 * 24 * 7); // 7일 유지
			System.out.println("둘다 재발급");
		
			// JSON 응답에 액세스 토큰도 포함 (React에서 사용 가능)
			return ResponseEntity.ok(Map.of("success", true, "message", "액세스 리프레시 토큰 재발급 성공!"));
		}
		
	// JWT 쿠키 삭제 메소드
	private void deleteJwtCookie(HttpServletResponse response, String name) {
		Cookie cookie = new Cookie(name, "");
		cookie.setHttpOnly(true);
		cookie.setSecure(true);
		cookie.setPath("/");
		cookie.setMaxAge(0); // 즉시 삭제
		response.addCookie(cookie);
	}

	// 공통 메소드: JWT를 HttpOnly 쿠키에 저장
	private void addJwtCookie(HttpServletResponse response, String name, String token, int maxAge) {
		Cookie cookie = new Cookie(name, token);
		cookie.setHttpOnly(true);
		cookie.setSecure(true);
		cookie.setPath("/");
		cookie.setMaxAge(maxAge);
		cookie.setAttribute("SameSite", "Strict"); // XSRF 방지
		response.addCookie(cookie);
	}

	// 공통 메소드: 창닫으면 사라지는 쿠기 JWT
	private void addSessionJwtCookie(HttpServletResponse response, String name, String token) {
		Cookie cookie = new Cookie(name, token);
		cookie.setHttpOnly(true);
		cookie.setSecure(true);
		cookie.setPath("/");
		cookie.setMaxAge(-1);
		cookie.setAttribute("SameSite", "Strict"); // XSRF 방지
		response.addCookie(cookie);
	}

}
