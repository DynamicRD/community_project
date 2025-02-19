package com.project;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.project.common.config.SecretConfig;

public class Test {

	public static void main(String[] args) throws IOException {
		SecretConfig secretConfig = new SecretConfig();
		System.out.println(secretConfig.getKakaoClienID());
		System.out.println(secretConfig.getKaKaoRedirectURL());

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		// 비밀번호 암호화
		String rawPassword = "admin"; // 원래 비밀번호
		String encryptedPassword = encoder.encode(rawPassword);
		System.out.println("암호화된 번호" + encryptedPassword);

		boolean isMatch = encoder.matches("admin", encryptedPassword);
		System.out.println(isMatch);

		String uploadPath = Paths.get("src/main/resources/static/upload").toAbsolutePath().toString();
		System.out.println("업로드 폴더 경로: " + uploadPath);

	}

}
