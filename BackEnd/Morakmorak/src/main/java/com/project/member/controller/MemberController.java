package com.project.member.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.common.config.JwtTokenProvider;
import com.project.common.config.JwtUtil;
import com.project.common.config.SecretConfig;
import com.project.member.model.SnsInfo;
import com.project.member.model.Member;
import com.project.member.model.MemberRegist;
import com.project.member.model.SnsInfo;
import com.project.member.service.MemberService;

import io.jsonwebtoken.Claims;
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
	private JwtUtil jwtutil;
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	@Autowired
	private RestTemplate restTemplate;

	private SecretConfig secretConfig = new SecretConfig();

	@GetMapping("/kakao")
	public ResponseEntity<String> kakaoLogin(@RequestParam("code") String code,
			@RequestParam(value = "rememberMe", defaultValue = "false") boolean rememberMe,
			HttpServletResponse response) {
		String kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";

		// 요청할 파라미터 설정
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", secretConfig.getKakaoClienID());
		params.add("redirect_uri", "http://localhost:8080/member/kakao"); // 실제 redirect URL로 변경
		params.add("code", code);

		// HTTP 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
		RestTemplate restTemplate = new RestTemplate();

		try {
			// 카카오 서버에 요청 보내기
			ResponseEntity<String> kakaoResponse = restTemplate.exchange(kakaoTokenUrl, HttpMethod.POST, request,
					String.class);

			System.out.println("카카오 응답: " + kakaoResponse.getBody());
			// Jackson의 ObjectMapper 생성
			ObjectMapper objectMapper = new ObjectMapper();

			// JSON 문자열을 Map으로 변환
			Map<String, Object> responseMap = objectMapper.readValue(kakaoResponse.getBody(), Map.class);

			// "access_token" 값 추출
			String accessToken = (String) responseMap.get("access_token");
			Map<String, Object> KakaoInfo = getKakaoUserInfo(accessToken);
			// KakaoInfo에서 필요한 정보 추출
			Long id = (Long) KakaoInfo.get("id");
			String idStr = String.valueOf(id);

			// "properties" 안에서 "nickname"과 "thumbnail_image" 추출
			Map<String, Object> properties = (Map<String, Object>) KakaoInfo.get("properties");
			String nickname = (String) properties.get("nickname");
			String thumbnailImage = (String) properties.get("thumbnail_image");

			// "kakao_account" 안에서 "email" 추출
			Map<String, Object> kakaoAccount = (Map<String, Object>) KakaoInfo.get("kakao_account");
			String email = (String) kakaoAccount.get("email");

			Member member = new Member();
			member.setProviderId(idStr);
			member.setProvider("kakao");

			// 사용자가 이미 존재하는지 확인
			boolean isRegistered = service.snsUserCheck(member);
			System.out.println("계정 사용자 체크 : " + isRegistered);
			if (isRegistered) {
				// 기존 회원 로그인 처리
				member = service.selectSnsInfo(member);
				member.setRememberMe(rememberMe);

				String jwtAccessToken = jwtutil.createAccessToken(member);
				String jwtRefreshToken = jwtutil.createRefreshToken(member, rememberMe);

				log.info("✅ JWT 생성 완료");

				// JWT를 HttpOnly 쿠키에 저장
				addSessionJwtCookie(response, "access_token", jwtAccessToken);

				if (rememberMe) {
					System.out.println("로그인 기억");
					addJwtCookie(response, "refresh_token", jwtRefreshToken, 60 * 60 * 24 * 7); // 7일 유지
				} else {
					System.out.println("로그인 기억하지 않음");
					addSessionJwtCookie(response, "refresh_token", jwtRefreshToken); // 세션 쿠키
				}

				// ✅ 로그인 성공 후 쿠키와 함께 React로 리다이렉트 (isRegistered=true 전달)
				return ResponseEntity.status(HttpStatus.FOUND) // 302 Redirect
						.header(HttpHeaders.LOCATION,
								"http://localhost:5173/login/googlecheck?isRegistered=true&sns=kakao")
						.build();
			} else {
				// 회원가입 필요
				SnsInfo snsInfo = new SnsInfo();
				snsInfo.setEmail(email);
				snsInfo.setId(idStr);
				snsInfo.setName(nickname);
				snsInfo.setPicture(thumbnailImage);
				System.out.println(snsInfo);
				String jwtTempGoogleToken = jwtutil.createTemporarySnsToken(snsInfo);
				addJwtCookie(response, "google_temp_token", jwtTempGoogleToken, 10);
				// ✅ 회원가입 필요 (isRegistered=false 전달)
				return ResponseEntity.status(HttpStatus.FOUND) // 302 Redirect
						.header(HttpHeaders.LOCATION,
								"http://localhost:5173/login/googlecheck?isRegistered=false&sns=kakao")
						.build();
			}

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("카카오 로그인 실패");
		}
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
	public ResponseEntity<?> registerMember(@RequestBody MemberRegist memberRegist) {
		try {
			// 회원가입 로직 처리 (예: DB 저장)
			service.register(memberRegist);
			return ResponseEntity.ok().body(Collections.singletonMap("message", "회원가입 성공"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(Collections.singletonMap("message", "회원가입 실패: " + e.getMessage()));
		}
	}

	// 회원가입 진행
	@PostMapping("/infochange")
	public ResponseEntity<?> infoChangeMember(@RequestBody MemberRegist memberRegist) {
		try {
			// 회원가입 로직 처리 (예: DB 저장)
			System.out.println(memberRegist);
			service.infoChange(memberRegist);
			return ResponseEntity.ok().body(Collections.singletonMap("message", "회원정보 수정 성공"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(Collections.singletonMap("message", "회원정보 수정 실패: " + e.getMessage()));
		}
	}

	// 전화번호 중복 확인
	@PostMapping("/phoneduplicatecheck")
	public Map<String, Boolean> phoneDuplicateCheck(@RequestBody MemberRegist memberRegist) {
		Map<String, Boolean> response = new HashMap<>();

		if (service.phoneDuplicateCheck(memberRegist)) {
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
		// DB에서 사용자 확인
		Member member2 = service.loginCheck(member);
		System.out.println("member2값 읽어오기" + member2);
		if (member2 == null) {
			return ResponseEntity.status(404).body(Map.of("success", false, "message", "등록되지 않은 사용자입니다. 회원가입이 필요합니다."));
		}
		System.out.println(member2);
		deleteJwtCookie(response, "refresh_token"); // 기존 리프레시 토큰 삭제

		// JWT 생성
		String accessToken = jwtutil.createAccessToken(member2);
		String refreshToken = jwtutil.createRefreshToken(member2, member.isRememberMe());

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

	// 리프레시 토큰 유효시간 검증
	@GetMapping("/refresh_check")
	public ResponseEntity<?> checkRefreshToken(
			@CookieValue(value = "refresh_token", required = false) String refreshToken, HttpServletResponse response) {

		System.out.println("토큰 유효시간 검증");
		System.out.println(refreshToken);
		if (refreshToken == null || !jwtTokenProvider.validateToken(refreshToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
		}
		System.out.println("토큰 아이디");
		int no = JwtUtil.getNoFromToken(refreshToken);
		System.out.println("no추출 완료 : " + no);
		Member member = new Member();
		member.setNo(no);

		// id로 DB에 멤버정보를 긁어온다
		member = service.selectMemberByNo(member);
		System.out.println(member);
		long remainingTime = jwtutil.getExpireDateFromToken(refreshToken);
		if (remainingTime < 10 * 60 * 1000) { // 10분 이하 남았을 경우
			return refreshTwoToken(member, response);

		} else {
			return refreshAccessToken(member, response);
		}
	}

	@GetMapping("/getdata")
	public ResponseEntity<Map<String, Object>> getRole(
			@CookieValue(value = "access_token", required = false) String accessToken,
			@CookieValue(value = "refresh_token", required = false) String refreshToken, HttpServletResponse response) {
		// 액세스 토큰 검증
		if (accessToken == null || !jwtTokenProvider.validateToken(accessToken)) {
			System.out.println("만료된 토큰");
			Cookie accessTokenCookie = new Cookie("access_token", null);
			accessTokenCookie.setMaxAge(0);
			accessTokenCookie.setPath("/");
			accessTokenCookie.setHttpOnly(true);
			response.addCookie(accessTokenCookie);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Map.of("success", false, "message", "Invalid access token"));
		}
		// 토큰에서 ID 추출
		System.out.println(accessToken);
		Integer no = jwtTokenProvider.getNoFromToken(accessToken);
		// DB에서 회원 정보 조회
		Member member = new Member();
		if (no == null) {
			no = -1;
		}
		member.setNo(no);
		System.out.println("no값은 " + no);
		try {
			// DB에서 회원 정보 조회
			member = service.selectMemberByNo(member);

			if (member == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(Map.of("success", false, "message", "회원 정보를 찾을 수 없습니다."));
			}

			// JSON 응답 생성
			Map<String, Object> responseData = Map.of("success", true, "message", "로그인 성공!", "member", member);
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
		return ResponseEntity
				.ok(Map.of("accessTokenExists", accessTokenExists, "refreshTokenExists", refreshTokenExists));
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

	@RequestMapping("/googlelogin")
	public ResponseEntity<?> googleLogin(@RequestParam("code") String code,
			@RequestParam(value = "rememberMe", defaultValue = "false") boolean rememberMe,
			HttpServletResponse response) {

		// 1. 받은 인증 코드를 사용하여 Google에 액세스 토큰 요청
		String tokenUrl = "https://oauth2.googleapis.com/token";
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("code", code);
		params.add("client_id", secretConfig.getGoogleClientID());
		params.add("client_secret", secretConfig.getGoogleClientSecret());
		params.add("redirect_uri", secretConfig.getGoogleRedirectUri());
		params.add("grant_type", "authorization_code");

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
		ResponseEntity<Map> responseGoogle = restTemplate.postForEntity(tokenUrl, request, Map.class);

		if (!responseGoogle.getStatusCode().is2xxSuccessful()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Map.of("success", false, "message", "구글 로그인 실패"));
		}

		Map<String, Object> responseBody = responseGoogle.getBody();
		String accessToken = (String) responseBody.get("access_token");

		// 2. 액세스 토큰을 사용하여 사용자 정보 요청
		String userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
		HttpHeaders userHeaders = new HttpHeaders();
		userHeaders.setBearerAuth(accessToken);
		HttpEntity<String> userRequest = new HttpEntity<>(userHeaders);

		ResponseEntity<Map> userResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, userRequest, Map.class);
		if (!userResponse.getStatusCode().is2xxSuccessful()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Map.of("success", false, "message", "사용자 정보 요청 실패"));
		}

		Map<String, Object> userInfo = userResponse.getBody();
		System.out.println(userInfo);
		String providerId = (String) userInfo.get("id");

		Member member = new Member();
		member.setProviderId(providerId);
		member.setProvider("google");

		// 사용자가 이미 존재하는지 확인
		boolean isRegistered = service.snsUserCheck(member);

		if (isRegistered) {
			// 기존 회원 로그인 처리
			member = service.selectSnsInfo(member);
			member.setRememberMe(rememberMe);

			String jwtAccessToken = jwtutil.createAccessToken(member);
			String jwtRefreshToken = jwtutil.createRefreshToken(member, rememberMe);

			log.info("✅ JWT 생성 완료");

			// JWT를 HttpOnly 쿠키에 저장
			addSessionJwtCookie(response, "access_token", jwtAccessToken);

			if (rememberMe) {
				System.out.println("로그인 기억");
				addJwtCookie(response, "refresh_token", jwtRefreshToken, 60 * 60 * 24 * 7); // 7일 유지
			} else {
				System.out.println("로그인 기억하지 않음");
				addSessionJwtCookie(response, "refresh_token", jwtRefreshToken); // 세션 쿠키
			}

			// ✅ 로그인 성공 후 쿠키와 함께 React로 리다이렉트 (isRegistered=true 전달)
			return ResponseEntity.status(HttpStatus.FOUND) // 302 Redirect
					.header(HttpHeaders.LOCATION, "http://localhost:5173/login/googlecheck?isRegistered=true").build();
		} else {
			// 회원가입 필요
			SnsInfo snsInfo = new SnsInfo();
			ObjectMapper objectMapper = new ObjectMapper();
			snsInfo = objectMapper.convertValue(userInfo, SnsInfo.class);
			String jwtTempGoogleToken = jwtutil.createTemporarySnsToken(snsInfo);
			addJwtCookie(response, "google_temp_token", jwtTempGoogleToken, 10);
			// ✅ 회원가입 필요 (isRegistered=false 전달)
			return ResponseEntity.status(HttpStatus.FOUND) // 302 Redirect
					.header(HttpHeaders.LOCATION, "http://localhost:5173/login/googlecheck?isRegistered=false").build();
		}
	}

	@GetMapping("/google_info")
	public ResponseEntity<?> getGoogleUserInfo(
			@CookieValue(name = "google_temp_token", required = false) String token) {
		if (token == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No token found");
		}

		try {
			Claims claims = jwtutil.parseToken(token); // 토큰 검증 및 디코딩
			String id = claims.get("id", String.class);
			String email = claims.get("email", String.class);
			String name = claims.get("name", String.class);
			String picture = claims.get("picture", String.class);

			Map<String, String> userInfo = new HashMap<>();
			userInfo.put("id", id);
			userInfo.put("email", email);
			userInfo.put("name", name);
			userInfo.put("picture", picture);
			System.out.println(userInfo);
			return ResponseEntity.ok(userInfo);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
		}
	}

	@PostMapping("/withdrawal")
	public ResponseEntity<?> withdrawlMember(@RequestBody MemberRegist memberRegist) {
		Member member = new Member();
		member.setPw(memberRegist.getPass());
		member.setNo(memberRegist.getNo());
		boolean passCheck = service.passCheckNo(member);
		if (passCheck || memberRegist.getPass().equals("")) {
			try {
				// 회원탈퇴
				try {
					// 파일 경로 설정
					String uploadDir = Paths.get("src/main/resources/static/upload").toAbsolutePath().toString() + "/";
					Path filePath = Paths.get(uploadDir + memberRegist.getPicture());
					File file = filePath.toFile();
					// 파일 존재 여부 확인 후 삭제
					if (file.exists()) {
						Files.delete(filePath);
						System.out.println("파일 삭제 성공: ");
					} else {
						System.out.println("파일을 찾을 수 없음: ");
					}
				} catch (Exception e) {
					System.out.println("파일 삭제 중 오류 발생: " + e.getMessage());
				}
				service.deleteMember(member);
				return ResponseEntity.ok().body(Collections.singletonMap("message", "회원탈퇴 성공"));
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(Collections.singletonMap("message", "회원탈퇴 실패: " + e.getMessage()));
			}
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "비밀번호 불일치"));
		}

	}

	// --------------------------------------------------api메소드가 아닌 컨트롤러용 메소드
	// 액세스 토큰 재발급
	public ResponseEntity<?> refreshAccessToken(Member member, HttpServletResponse response) {

		String accessToken = jwtutil.createAccessToken(member);

		addSessionJwtCookie(response, "access_token", accessToken); // 끄면 삭제
		return ResponseEntity.ok(Map.of("success", true, "message", "액세스토큰 재발급 성공!"));
	}

	// 둘다 재발급
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
		String accessToken = jwtutil.createAccessToken(member2);
		String refreshToken = jwtutil.createRefreshToken(member2, true);

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

	public Map<String, Object> getKakaoUserInfo(String accessToken) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);
		headers.setContentType(MediaType.APPLICATION_JSON);

		ResponseEntity<Map> response = restTemplate.exchange("https://kapi.kakao.com/v2/user/me", HttpMethod.GET,
				new HttpEntity<>(headers), Map.class);

		return response.getBody();
	}

	@PostMapping("/checkId")
	public Map<String, Object> findMemberId(@RequestParam Map<String, Object> map) {
		Map<String, Object> value = service.findMemberId(map);
		log.info("value = " + value);
		return service.findMemberId(map);
	}

	@PostMapping("/checkPw")
	public Map<String, Object> findMemberPw(@RequestParam Map<String, Object> map) {
		Map<String, Object> count = service.findMemberPw(map);
		log.info("value = " + count);
		return service.findMemberPw(map);
	}

	@PostMapping("/changePw")
	public void changeMemberPw(@RequestParam Map<String, Object> map) {
		service.changeMemberPw(map);

	}
}
