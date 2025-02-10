package com.project.google.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class GoogleRefreshToken {
	private Long id;
	private Long userId;
	private String refreshToken;
	private LocalDateTime expirationTime;
	private LocalDateTime issuedAt;
	private String status;
}
