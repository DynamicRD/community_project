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
	private static final long ACCESS_TOKEN_EXPIRATION_TIME = 1000 * 60 * 30; // 30분
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
				// 로그인체크에따라 리프레시토큰 수명
				.setExpiration(new Date(System.currentTimeMillis()
						+ ((rememberMe) ? (REFRESH_TOKEN_REMEBER_EXPIRATION_TIME) : (REFRESH_TOKEN_EXPIRATION_TIME))))
				.signWith(SignatureAlgorithm.HS256, secretConfig.getJwtSecretKey()).compact();
	}

	public static String createTemporaryGoogleToken(SnsInfo snsInfo) {
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

//import java.nio.charset.StandardCharsets;
//import java.util.Base64;
//import java.util.Date;
//import javax.crypto.Mac;
//import javax.crypto.spec.SecretKeySpec;
//import org.springframework.stereotype.Component;
//
//@Component
//public class JwtUtil {
//    
//    private String secretKey = "yourSecretKey";  // 비밀 키
//
//    // JWT 토큰 생성
//    public String createAccessToken(String email) {
//        Date now = new Date();
//        Date expiryDate = new Date(now.getTime() + 1000 * 60 * 30); // 30분 만료
//
//        // 헤더
//        String header = "{\"alg\": \"HS512\", \"typ\": \"JWT\"}";
//        String encodedHeader = Base64.getEncoder().encodeToString(header.getBytes(StandardCharsets.UTF_8));
//
//        // 페이로드
//        String payload = String.format("{\"sub\": \"%s\", \"iat\": %d, \"exp\": %d}", email, now.getTime(), expiryDate.getTime());
//        String encodedPayload = Base64.getEncoder().encodeToString(payload.getBytes(StandardCharsets.UTF_8));
//
//        // 서명
//        String signature = encodedHeader + "." + encodedPayload;
//        String encodedSignature = Base64.getEncoder().encodeToString(hmacSha512(secretKey, signature));
//
//        // JWT 반환: Header.Payload.Signature
//        return encodedHeader + "." + encodedPayload + "." + encodedSignature;
//    }
//
//    // Refresh Token 생성
//    public String createRefreshToken(String email, String string, String string2) {
//        Date now = new Date();
//        Date expiryDate = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7); // 7일 만료
//
//        // 페이로드 (Refresh Token은 Access Token보다 긴 만료기간)
//        String payload = String.format("{\"sub\": \"%s\", \"iat\": %d, \"exp\": %d}", email, now.getTime(), expiryDate.getTime());
//
//        // 서명
//        String signature = payload + secretKey;
//        return Base64.getEncoder().encodeToString(hmacSha512(secretKey, signature));
//    }
//
//    // JWT 서명 생성
//    private byte[] hmacSha512(String key, String data) {
//        try {
//            Mac mac = Mac.getInstance("HmacSHA512");
//            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
//            mac.init(secretKey);
//            return mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
//        } catch (Exception e) {
//            throw new RuntimeException("Error while generating HMAC SHA-512 signature", e);
//        }
//    }
//}

//// JWT 생성 (Base64로 인코딩)
//public String createToken(String username) {
//	Date now = new Date();
//	Date expiryDate = new Date(now.getTime() + 1000 * 60 * 30); // 30분 만료
//
//	// Header (Base64로 인코딩된 JSON 형식)
//	String header = "{\"alg\": \"HS512\", \"typ\": \"JWT\"}";
//	String encodedHeader = Base64.getEncoder().encodeToString(header.getBytes(StandardCharsets.UTF_8));
//
//	// Payload (Base64로 인코딩된 JSON 형식)
//	String payload = String.format("{\"sub\": \"%s\", \"iat\": %d, \"exp\": %d}", username, now.getTime(),
//			expiryDate.getTime());
//	String encodedPayload = Base64.getEncoder().encodeToString(payload.getBytes(StandardCharsets.UTF_8));
//
//	// Signature (Base64로 인코딩된 서명)
//	String signature = encodedHeader + "." + encodedPayload;
//	String encodedSignature = Base64.getEncoder().encodeToString(hmacSha512(secretKey, signature));
//
//	// JWT 반환: Header.Payload.Signature
//	return encodedHeader + "." + encodedPayload + "." + encodedSignature;
//}
//
//public String createTokenWithGoogleAccessToken(String username, String googleAccessToken) {
//	Date now = new Date();
//	Date expiryDate = new Date(now.getTime() + 1000 * 60 * 30); // 30분 만료
//
//	// Header (Base64로 인코딩된 JSON 형식)
//	String header = "{\"alg\": \"HS512\", \"typ\": \"JWT\"}";
//	String encodedHeader = Base64.getEncoder().encodeToString(header.getBytes(StandardCharsets.UTF_8));
//
//	// Payload (Base64로 인코딩된 JSON 형식)
//	String payload = String.format("{\"sub\": \"%s\", \"iat\": %d, \"exp\": %d, \"googleAccessToken\": \"%s\"}",
//			username, now.getTime(), expiryDate.getTime(), googleAccessToken);
//	String encodedPayload = Base64.getEncoder().encodeToString(payload.getBytes(StandardCharsets.UTF_8));
//
//	// Signature (Base64로 인코딩된 서명)
//	String signature = encodedHeader + "." + encodedPayload;
//	String encodedSignature = Base64.getEncoder().encodeToString(hmacSha512(secretKey, signature));
//
//	// JWT 반환: Header.Payload.Signature
//	return encodedHeader + "." + encodedPayload + "." + encodedSignature;
//}
//
//// Refresh Token 생성
//public String createRefreshToken(String tokenType, String username, String role) {
//	Date now = new Date();
//	Date expiryDate = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7); // 7일 만료
//
//	// Header (Base64로 인코딩된 JSON 형식)
//	String header = "{\"alg\": \"HS512\", \"typ\": \"JWT\"}";
//	String encodedHeader = Base64.getEncoder().encodeToString(header.getBytes(StandardCharsets.UTF_8));
//
//	// Payload (Base64로 인코딩된 JSON 형식)
//	String payload = String.format(
//			"{\"sub\": \"%s\", \"role\": \"%s\", \"iat\": %d, \"exp\": %d, \"type\": \"%s\"}", username, role,
//			now.getTime(), expiryDate.getTime(), tokenType);
//	String encodedPayload = Base64.getEncoder().encodeToString(payload.getBytes(StandardCharsets.UTF_8));
//
//	// Signature (Base64로 인코딩된 서명)
//	String signature = encodedHeader + "." + encodedPayload;
//	String encodedSignature = Base64.getEncoder().encodeToString(hmacSha512(secretKey, signature));
//
//	// JWT 반환: Header.Payload.Signature
//	return encodedHeader + "." + encodedPayload + "." + encodedSignature;
//}
//
//public String getGoogleAccessTokenFromJwt(String jwtToken) {
//	// JWT를 "." 기준으로 분리
//	String[] parts = jwtToken.split("\\.");
//	String encodedPayload = parts[1]; // Payload 부분 추출
//
//	// Base64로 디코딩
//	String decodedPayload = new String(Base64.getDecoder().decode(encodedPayload), StandardCharsets.UTF_8);
//
//	// 구글 Access Token 추출 (예: 페이로드에서 googleAccessToken 클레임을 찾음)
//	String googleAccessToken = extractGoogleAccessToken(decodedPayload);
//	return googleAccessToken;
//}
//
//// 구글 access토큰 추출
//private String extractGoogleAccessToken(String payload) {
//	// JSON 형태로 파싱하여 googleAccessToken 추출
//	try {
//		ObjectMapper objectMapper = new ObjectMapper();
//		JsonNode jsonNode = objectMapper.readTree(payload);
//		return jsonNode.get("googleAccessToken").asText();
//	} catch (Exception e) {
//		e.printStackTrace();
//		return null;
//	}
//}
//
//// JWT에서 사용자 정보 추출 (Base64로 디코딩)
//public String extractUsername(String token) {
//	String[] parts = token.split("\\.");
//	if (parts.length != 3) {
//		throw new IllegalArgumentException("Invalid JWT token");
//	}
//	String encodedPayload = parts[1];
//	String payload = new String(Base64.getDecoder().decode(encodedPayload), StandardCharsets.UTF_8);
//	return extractClaim(payload, "sub");
//}
//
//// JWT 유효성 검증 (단순히 만료일자 확인)
//public boolean isTokenExpired(String token) {
//	String[] parts = token.split("\\.");
//	if (parts.length != 3) {
//		throw new IllegalArgumentException("Invalid JWT token");
//	}
//	String encodedPayload = parts[1];
//	String payload = new String(Base64.getDecoder().decode(encodedPayload), StandardCharsets.UTF_8);
//
//	long expiration = Long.parseLong(extractClaim(payload, "exp"));
//	return expiration < System.currentTimeMillis();
//}
//
//// JWT에서 주어진 클레임 추출
//private String extractClaim(String payload, String claim) {
//	int startIndex = payload.indexOf(claim + "\": \"") + claim.length() + 4; // 4 is the length of `": "`
//	int endIndex = payload.indexOf("\"", startIndex);
//	return payload.substring(startIndex, endIndex);
//}
//
//// HMAC SHA-512 서명 생성 (Base64 인코딩)
//private byte[] hmacSha512(String key, String data) {
//	try {
//		javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA512");
//		javax.crypto.spec.SecretKeySpec secretKey = new javax.crypto.spec.SecretKeySpec(
//				key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
//		mac.init(secretKey);
//		return mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
//	} catch (Exception e) {
//		throw new RuntimeException("Error while generating HMAC SHA-512 signature", e);
//	}
//}