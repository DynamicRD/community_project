package com.project.common.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class JwtResponse {
	 private String jwtToken;
	 private boolean isNewUser;
}
