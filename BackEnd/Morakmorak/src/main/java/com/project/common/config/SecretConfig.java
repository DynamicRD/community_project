package com.project.common.config;

import org.springframework.stereotype.Component;

import io.github.cdimascio.dotenv.Dotenv;

@Component
public class SecretConfig {
    
    private final Dotenv dotenv = Dotenv.load(); // .env 파일 로드
    
    public String getNurigoApiKey() {
        return dotenv.get("NURIGO_PESONAL_KEY");
    }


    public String getNurigoSecretKey() {
        return dotenv.get("NURIGO_SECRET_KEY");
    }

    public String getJwtSecretKey() {
        return dotenv.get("JWT_SECRETKEY");
    }
    
    public String getKakaoClienID() {
    	return dotenv.get("KAKAO_CLIENT_ID");
    }
    public String getKaKaoRedirectURL() {
    	return dotenv.get("KAKAO_REDIRECT_URI");
    }
    
    public String getGoogleClientID() {
    	return dotenv.get("GOOGLE_CLIENT_ID");
    }
    
    public String getGoogleClientSecret() {
    	return dotenv.get("GOOGLE_CLIENT_SECRET");
    }

    public String getGoogleRedirectUri() {
    	return dotenv.get("GOOGLE_REDIRECT_URI");
    }

    public String getSendEmail() {
    	return dotenv.get("GOOGLE_EMAIL");
    }
    
    public String getTossId() {
    	return dotenv.get("TOSS_ORDER_ID");
    }
}