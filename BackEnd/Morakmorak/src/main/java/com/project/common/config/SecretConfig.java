package com.project.common.config;

import org.springframework.stereotype.Component;

import io.github.cdimascio.dotenv.Dotenv;

@Component
public class SecretConfig {
    
    private final Dotenv dotenv = Dotenv.load(); // .env 파일 로드
    
    public String getApiKey() {
        return dotenv.get("NURIGO_PESONAL_KEY");
    }

    public String getSecretKey() {
        return dotenv.get("NURIGO_SECRECT_KEY");
    }

    public String getJwtSecretKey() {
        return dotenv.get("JWT_SECRETKEY");
    }


}