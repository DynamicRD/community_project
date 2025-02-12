package com.project.common.config;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
@Service
public class JwtTokenProvider {
  public  SecretConfig secretConfig = new SecretConfig();
    // 토큰 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretConfig.getJwtSecretKey()).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // 토큰에서 사용자 정보 추출
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                   .setSigningKey(secretConfig.getJwtSecretKey())
                   .parseClaimsJws(token)
                   .getBody()
                   .getSubject();
    }
    
    //리프레시토큰 만료일자 뽑아내기
    public Date getExpirationDate(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor((secretConfig.getJwtSecretKey()).getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getExpiration(); // 만료 시간 반환
        } catch (Exception e) {
            System.out.println("JWT 파싱 중 오류 발생: " + e.getMessage());
            return null;
        }
    }
    
    //리프레시 토큰에서 id 뽑아내기
    public String getIdFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor((secretConfig.getJwtSecretKey()).getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.get("id", String.class); // `id` 값을 String으로 가져오기
        } catch (Exception e) {
            System.out.println("JWT 파싱 오류: " + e.getMessage());
            return null; // 오류 발생 시 null 반환
        }
    }
    
    
    public Integer getNoFromToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretConfig.getJwtSecretKey())
                    .parseClaimsJws(token)
                    .getBody();

            return claims.get("no",Integer.class); // "no" 값을 Long 타입으로 가져옴
        } catch (Exception e) {
            e.printStackTrace();
            return null; // 유효하지 않은 토큰일 경우 null 반환
        }
    }

}
