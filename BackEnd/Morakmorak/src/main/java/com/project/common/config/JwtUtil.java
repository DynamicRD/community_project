package com.project.common.config;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.project.member.model.SnsInfo;
import com.project.member.model.Member;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

	private static SecretConfig secretConfig = new SecretConfig();
	private static final long ACCESS_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60; // 60분
	private static final long REFRESH_TOKEN_REMEBER_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // 7일
	private static final long REFRESH_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // 7일

	public static String createAccessToken(Member member) {
		return Jwts.builder().setSubject("userRegister").claim("no", member.getNo()).claim("id", member.getId())
				.claim("name", member.getName()).claim("role", member.getRole()).claim("provider", member.getProvider())
				.claim("phone", member.getPhone()).claim("gender", String.valueOf(member.getGender()))
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS256, secretConfig.getJwtSecretKey()).compact();
	}

	public static String createRefreshToken(Member member, boolean rememberMe) {
		return Jwts.builder().setSubject("refreshToken").claim("no", member.getNo()).claim("id", member.getId())
				.claim("provider", member.getProvider()).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis()
						+ ((rememberMe) ? (REFRESH_TOKEN_REMEBER_EXPIRATION_TIME) : (REFRESH_TOKEN_EXPIRATION_TIME))))
				.signWith(SignatureAlgorithm.HS256, secretConfig.getJwtSecretKey()).compact();
	}

	public static String createTemporarySnsToken(SnsInfo snsInfo) {
		return Jwts.builder().setSubject("googleUser").claim("id", snsInfo.getId())
				.claim("email", snsInfo.getEmail()).claim("verifiedEmail", snsInfo.isVerifiedEmail())
				.claim("name", snsInfo.getName()).claim("givenName", snsInfo.getGivenName())
				.claim("familyName", snsInfo.getFamilyName()).claim("picture", snsInfo.getPicture())
				.setIssuedAt(new Date()) // 발급 시간
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 10)) // 만료 시간
				.signWith(SignatureAlgorithm.HS256, secretConfig.getJwtSecretKey()) // 서명
				.compact();
	}

	public static String kakaoGenerateAccessToken(String email) {
		return Jwts.builder().setSubject(email)
				.setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS256, secretConfig.getJwtSecretKey()).compact();
	}

	public static String kakaoGenerateRefreshToken(String email) {
		return Jwts.builder().setSubject(email)
				.setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS256, secretConfig.getJwtSecretKey()).compact();
	}

	public Claims parseToken(String token) {
		return Jwts.parser().setSigningKey(secretConfig.getJwtSecretKey()).parseClaimsJws(token).getBody();
	}

	/** ✅ JWT 검증 및 Claims 반환 */
	public Claims validateToken(String token) {
		return Jwts.parser().setSigningKey(secretConfig.getJwtSecretKey()).parseClaimsJws(token).getBody();
	}

	/** ✅ JWT에서 Role 추출 */
	public String getRoleFromToken(String token) {
		return validateToken(token).get("role", String.class);
	}

	/** ✅ JWT 만료 여부 확인 */
	public boolean isTokenExpired(String token) {
		Claims claims = validateToken(token);
		return claims.getExpiration().before(new Date()); // 만료 시간이 현재보다 이전이면 true 반환
	}

	/** ✅ JWT에서 id,provider 추출해서 User에 담아서 반환 */
	public Member getIdProviderFromToken(String token) {
		Member member = new Member();
		member.setId(validateToken(token).get("id", String.class));
		member.setProvider(validateToken(token).get("provider", String.class));
		return member;
	}

	public static Integer getNoFromToken(String token) {
		 Claims claims = Jwts.parser()
	                .setSigningKey(secretConfig.getJwtSecretKey())
	                .parseClaimsJws(token)
	                .getBody();

	        // "no" 값 추출
	        int no = claims.get("no", Integer.class);
	        return no;
	}
	
	public static Long getExpireDateFromToken(String token) {
		Claims claims = Jwts.parser()
				.setSigningKey(secretConfig.getJwtSecretKey())
				.parseClaimsJws(token)
				.getBody();
		
		// "no" 값 추출
		 // 토큰 만료일 (exp) 추출
        Date expirationDate = claims.getExpiration();

        // 현재 시간과 비교
        long remainingTime = expirationDate.getTime() - System.currentTimeMillis();
		return remainingTime;
	}

}

