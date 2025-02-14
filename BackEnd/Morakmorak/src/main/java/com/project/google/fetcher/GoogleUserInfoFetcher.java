package com.project.google.fetcher;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.google.model.GoogleInfo;

@Service
public class GoogleUserInfoFetcher {

    private static final String GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";
    private static final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

    // 사용자의 정보 가져오기
    public GoogleInfo fetchUserInfo(String accessToken) {
    	String userInfoUrl = GOOGLE_USER_INFO_URL;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, String.class);

        // 받은 body 값 (JSON 형태)
        String responseBody = response.getBody();

        // Jackson을 사용하여 JSON 파싱
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseBody);

            // GoogleUser 객체로 매핑
            String sub = rootNode.get("sub").asText();
            String name = rootNode.get("name").asText();
            String givenName = rootNode.get("given_name").asText();
            String familyName = rootNode.get("family_name").asText();
            String picture = rootNode.get("picture").asText();
            String email = rootNode.get("email").asText();
            boolean emailVerified = rootNode.get("email_verified").asBoolean();

            // GoogleUser 객체 생성
            GoogleInfo user = new GoogleInfo(sub, name, givenName, familyName, picture, email, emailVerified);

            return user; // GoogleUser 객체 반환

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }// 사용자의 정보 반환
    }

    // access token이 만료되었을 때 refresh token을 사용해 새로운 access token을 가져오는 메서드
    public String refreshAccessToken(String refreshToken) {
        String url = GOOGLE_TOKEN_URL;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        // refresh_token을 사용하여 새로운 access_token을 요청하는 파라미터 설정
        String body = "client_id=" + "YOUR_CLIENT_ID" +
                      "&client_secret=" + "YOUR_CLIENT_SECRET" +
                      "&refresh_token=" + refreshToken +
                      "&grant_type=refresh_token";

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            // response에서 access_token을 추출하여 반환
            // 예를 들어, JSON 파싱을 통해 access_token을 추출
            String accessToken = extractAccessTokenFromResponse(response.getBody());
            return accessToken;
        } else {
            throw new RuntimeException("Failed to refresh access token.");
        }
    }

    // 응답에서 access_token을 추출하는 메서드 (예시로 간단히 구현)
    private String extractAccessTokenFromResponse(String responseBody) {
        // JSON 파싱 라이브러리를 사용해 'access_token'을 추출할 수 있습니다.
        // 예를 들어, Jackson 라이브러리 등을 사용할 수 있습니다.

        // 여기서는 간단히 'access_token'을 추출하는 예시입니다. 실제 코드에서는 JSON 파싱이 필요합니다.
        String tokenPrefix = "\"access_token\":\"";
        int startIndex = responseBody.indexOf(tokenPrefix) + tokenPrefix.length();
        int endIndex = responseBody.indexOf("\"", startIndex);
        return responseBody.substring(startIndex, endIndex);
    }
}
