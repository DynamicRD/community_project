package com.project;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.project.common.config.SecretConfig;

public class Test {
	

	
	public static void main(String[] args) {
		SecretConfig secretConfig = new SecretConfig();
		System.out.println( secretConfig.getKakaoClienID());
		System.out.println( secretConfig.getKaKaoRedirectURL());
	    
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		// 비밀번호 암호화
		String rawPassword = "admin"; // 원래 비밀번호
		String encryptedPassword = encoder.encode(rawPassword);
		System.out.println("암호화된 번호" + encryptedPassword);

		
		
		boolean isMatch = encoder.matches("admin", encryptedPassword);
        System.out.println(isMatch);
	}

}
