package com.project.member.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.project.common.config.JwtUtil;
import com.project.common.config.SecretConfig;
import com.project.member.mapper.MemberMapper;
import com.project.member.model.Member;
import com.project.member.model.MemberDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final static SecretConfig secretConfig = new SecretConfig();

	@Autowired
	private MemberMapper mapper;
	private final JwtUtil jwtUtil;
	private final RestTemplate restTemplate = new RestTemplate();

	@Override
	public boolean duplicateCheck(Member member) {
		int count = mapper.idDuplicateCheck(member); // 오타 수정
		return count > 0;
	}

	@Override
	public boolean nickDuplicateCheck(Member member) {
		int count = mapper.nickDuplicateCheck(member); // 오타 수정
		return count > 0;
	}

	@Override
	public void register(MemberDTO memberDTO) {
		Member member = new Member();
		member.setId(memberDTO.getId());

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		// 비밀번호 암호화
		if (memberDTO.getPass() != null) {
			String rawPassword = memberDTO.getPass(); // 원래 비밀번호
			String encryptedPassword = encoder.encode(rawPassword);
			System.out.println(encryptedPassword);
			member.setPw(encryptedPassword);
		}
		if (memberDTO.getName() != null) {
			member.setName(memberDTO.getName());
		}
		if (memberDTO.getPhone1() != null) {
			member.setPhone(memberDTO.getPhone1() + memberDTO.getPhone2() + memberDTO.getPhone3());
		}
		member.setNickname(memberDTO.getNickname());
		System.out.println("생일 " + memberDTO.getBirth());
		member.setGender(memberDTO.getGender());
		member.setBirth(memberDTO.getBirth());
		member.setEmail(memberDTO.getEmail());
		member.setZipCode(memberDTO.getAddcode());
		member.setAddr1(memberDTO.getAddress01());
		member.setAddr2(memberDTO.getAddress02());
		if (memberDTO.getProvider().equals("google")) {
			member.setProvider(memberDTO.getProvider());
			member.setProviderId(memberDTO.getProviderId());
			mapper.registerGoogle(member);
		} else {
			mapper.register(member);
		}
	}

	@Override
	public boolean phoneDuplicateCheck(MemberDTO memberDTO) {
		Member member = new Member();
		member.setPhone(memberDTO.getPhone1() + memberDTO.getPhone2() + memberDTO.getPhone3());
		int count = mapper.phoneDuplicateCheck(member);
		return count > 0;
	}

	@Override
	public Member loginCheck(Member member) {
		String savedPass = mapper.passCompare(member);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		boolean isMatch = encoder.matches(member.getPw(), savedPass);
		System.out.println(isMatch);
		if (!isMatch) {
			return null;
		}
		try {

			Member userLogin = mapper.loginCheck(member);
			return userLogin; // 중복됐으면 false 중복이 아니며true
		} catch (Exception e) {
			log.error("User CheckRegist Error: {}", e.getMessage());
			throw new RuntimeException("중복 체크 실패", e);
		}
	}

	@Override
	@Transactional // ✅ 트랜잭션 적용
	public Map<String, String> kakaoLogin(String authCode) {

		String accessToken = getAccessToken(authCode);
		System.out.println(accessToken);
		// Kakao 사용자 정보 요청
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);
		headers.set("Content-Type", "application/x-www-form-urlencoded"); // 추가
		HttpEntity<String> entity = new HttpEntity<>(headers);

		ResponseEntity<Map> response = restTemplate.exchange("https://kapi.kakao.com/v2/user/me", HttpMethod.GET,
				entity, Map.class);
		System.out.println("🔹 Kakao API 응답: " + response.getBody()); // ✅ Kakao 응답 확인

		// 3️⃣ email 추출 (이메일이 null인지 확인)
		Map<String, Object> kakaoAccount = (Map<String, Object>) response.getBody().get("kakao_account");
		if (kakaoAccount == null) {
			System.out.println("❌ Kakao API 응답에 kakao_account가 없습니다.");
			throw new RuntimeException("Kakao API 응답이 올바르지 않습니다.");
		}

		Map<String, Object> properties = (Map<String, Object>) response.getBody().get("properties");
		String email = (String) ((Map<String, Object>) response.getBody().get("kakao_account")).get("email");
		String nickname = properties != null ? (String) properties.get("nickname") : "사용자";
		String providerId = response.getBody().get("id").toString();

		System.out.println("🔹 사용자 email: " + email); // ✅ 이메일 값이 정상인지 확인
		System.out.println("🔹 사용자 providerId: " + providerId);
		System.out.println("🔹 사용자 nickname: " + nickname);

		if (email == null) {
			System.out.println("❌ 이메일이 null입니다. 카카오 개발자센터에서 이메일 제공 동의를 확인하세요.");
			throw new RuntimeException("Kakao API에서 이메일을 가져올 수 없습니다.");
		}

		// 3️⃣ DB에 저장 (중복 검사 후)
		if (mapper.findByEmail(email) == null) {
			System.out.println("✅ DB에 저장 진행: " + email);

			// 🔹 Member 객체 생성 (provider와 providerId 추가)
			Member member = new Member();
			member.setEmail(email);
			member.setProvider("kakao"); // OAuth 제공자
			member.setProviderId(providerId); // Kakao의 고유 ID
			member.setNickname(nickname);

			// ✅ 디버깅을 위해 Member 객체 출력
			System.out.println("🔹 DB에 저장할 회원 정보: " + member);

			// 🔹 DB에 저장
			mapper.insertMember(member);
		} else {
			System.out.println("⚠ 이미 존재하는 이메일: " + email);
		}

		// JWT 토큰 생성
		String newAccessToken = jwtUtil.kakaoGenerateAccessToken(email);
		String refreshToken = jwtUtil.kakaoGenerateRefreshToken(email);

		Map<String, String> tokens = new HashMap<>();
		tokens.put("accessToken", newAccessToken);
		tokens.put("refreshToken", refreshToken);

		return tokens;
	}

	// 🔹 카카오 Access Token 요청 메서드 추가
	private String getAccessToken(String authCode) {
		String tokenUrl = "https://kauth.kakao.com/oauth/token" + "&client_id=" + secretConfig.getKakaoClienID()
				+ "&redirect_uri=" + secretConfig.getKaKaoRedirectURL() + "&code=" + authCode;

		ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, null, Map.class);
		return (String) response.getBody().get("access_token");
	}

	@Override
	public Member selectMemberByNo(Member member) {
		member = mapper.getMemberInfoByNo(member);
		return member;
	}

	@Override
	public boolean googleUserCheck(Member member) {
		int count = mapper.googleRegisteredCheck(member);
		return (count > 0) ? true : false;
	}

	@Override
	public Member selectGoogleInfo(Member member) {
		member = mapper.getGoogleInfo(member);
		return member;
	}

}
