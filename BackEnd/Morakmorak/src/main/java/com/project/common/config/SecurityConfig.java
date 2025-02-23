package com.project.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors() // CORS 설정 적용
            .and()
            .csrf().disable() // CSRF 보안 비활성화 (테스트용)
            .authorizeHttpRequests()
            .anyRequest().permitAll(); // 모든 요청 허용

        return http.build();
    }
}
