package com.project.common.config;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;

@Component
@Service
public class JwtTokenProvider {

    private final String JWT_SECRET_KEY = "yourSecretKey"; // 실제 앱에서는 더 안전한 방법으로 관리

    // 토큰 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // 토큰에서 사용자 정보 추출
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                   .setSigningKey(JWT_SECRET_KEY)
                   .parseClaimsJws(token)
                   .getBody()
                   .getSubject();
    }
}
