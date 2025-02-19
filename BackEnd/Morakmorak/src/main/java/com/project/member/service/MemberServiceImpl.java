package com.project.member.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import java.io.*;
import java.nio.file.*;
import com.project.common.config.JwtUtil;
import com.project.common.config.SecretConfig;
import com.project.member.mapper.MemberMapper;
import com.project.member.model.Member;
import com.project.member.model.MemberRegist;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final static SecretConfig secretConfig = new SecretConfig();

	@Autowired
	private MemberMapper mapper;

	@Override
	public boolean duplicateCheck(Member member) {
		int count = mapper.idDuplicateCheck(member); // 오타 수정
		return count > 0;
	}

	@Override
	public boolean nickDuplicateCheck(Member member) {
		int count = mapper.nickDuplicateCheck(member); // 오타 수정
		return count > 0;
	}

	@Override
	public void register(MemberRegist memberDTO) throws IOException {
		Member member = new Member();
		member.setId(memberDTO.getId());
		System.out.println(memberDTO.getId());
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		if (memberDTO.getProvider() == null) {
			memberDTO.setProvider("none");
			member.setProvider("none");
		}
		// 비밀번호 암호화
		if (memberDTO.getPass() != null) {
			String rawPassword = memberDTO.getPass(); // 원래 비밀번호
			String encryptedPassword = encoder.encode(rawPassword);
			System.out.println(encryptedPassword);
			member.setPw(encryptedPassword);
		}
		if (memberDTO.getName() != null) {
			member.setName(memberDTO.getName());
		}
		if (memberDTO.getPhone1() != null) {
			member.setPhone(memberDTO.getPhone1() + memberDTO.getPhone2() + memberDTO.getPhone3());
		}
		member.setNickname(memberDTO.getNickname());
		member.setGender(memberDTO.getGender());
		member.setBirth(memberDTO.getBirth());
		member.setEmail(memberDTO.getEmail());
		member.setZipCode(memberDTO.getAddcode());
		member.setAddr1(memberDTO.getAddress01());
		member.setAddr2(memberDTO.getAddress02());
		if (memberDTO.getProvider().equals("google") || memberDTO.getProvider().equals("kakao")) {
			String imageUrl = memberDTO.getPicture();
			System.out.println(imageUrl);
			// URL에서 파일명 추출
			String originalFileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

			String uploadDir = Paths.get("src/main/resources/static/upload").toAbsolutePath().toString() + "/";

			String newFileName = System.currentTimeMillis() + "_" + originalFileName;

			String FilePath = uploadDir + newFileName;

			if (memberDTO.getProvider().equals("kakao")) {
				try {
					RestTemplate restTemplate = new RestTemplate();
					ResponseEntity<Resource> response = restTemplate.getForEntity(imageUrl, Resource.class);
					Resource resource = response.getBody();

					if (resource != null) {
						InputStream inputStream = resource.getInputStream();
						Files.copy(inputStream, Paths.get(FilePath), StandardCopyOption.REPLACE_EXISTING);
						System.out.println("이미지 다운로드 성공: " + FilePath);

					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else if (memberDTO.getProvider().equals("google")) {
				try {
		            RestTemplate restTemplate = new RestTemplate();
		            
		            // HTTP 헤더를 포함한 요청
		            HttpHeaders headers = new HttpHeaders();
		            HttpEntity<String> entity = new HttpEntity<>(headers);

		            // 이미지 요청 (헤더 포함)
		            ResponseEntity<Resource> response = restTemplate.exchange(imageUrl, HttpMethod.GET, entity, Resource.class);

		            // Content-Type 확인
		            HttpHeaders responseHeaders = response.getHeaders();
		            String contentType = responseHeaders.getContentType() != null ? responseHeaders.getContentType().toString() : "image/jpeg";

		            // 확장자 결정 (기본값: jpg)
		            String extension = getFileExtension(contentType);

		            // 파일명 설정
		            newFileName =  System.currentTimeMillis() + "_" +"google_profile_image" + extension;
		            String filePath = uploadDir + newFileName;

		            // 파일 저장
		            Resource resource = response.getBody();
		            if (resource != null) {
		                InputStream inputStream = resource.getInputStream();
		                Files.copy(inputStream, Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
		                System.out.println("이미지 다운로드 성공: " + filePath);
		            }

		        } catch (Exception e) {
		            e.printStackTrace();
		        }
			}

			member.setProvider(memberDTO.getProvider());
			member.setProviderId(memberDTO.getProviderId());
			member.setImgUrl(newFileName);
			mapper.registerSns(member);
		} else {
			mapper.register(member);
		}
	}

	@Override
	public void infoChange(MemberRegist memberDTO) {
		Member member = new Member();

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		member.setNo(memberDTO.getNo());
		// 비밀번호 암호화
		if (memberDTO.getPass() != null) {
			String rawPassword = memberDTO.getPass(); // 원래 비밀번호
			String encryptedPassword = encoder.encode(rawPassword);
			System.out.println(encryptedPassword);
			member.setPw(encryptedPassword);
		}
		if (memberDTO.getName() != null) {
			member.setName(memberDTO.getName());
		}
		if (memberDTO.getPhone1() != null) {
			member.setPhone(memberDTO.getPhone1() + memberDTO.getPhone2() + memberDTO.getPhone3());
		}
		member.setNickname(memberDTO.getNickname());
		member.setGender(memberDTO.getGender());
		member.setBirth(memberDTO.getBirth());
		member.setEmail(memberDTO.getEmail());
		member.setZipCode(memberDTO.getAddcode());
		member.setAddr1(memberDTO.getAddress01());
		member.setAddr2(memberDTO.getAddress02());
		if (memberDTO.getProvider().equals("google")) {
			member.setProvider(memberDTO.getProvider());
			mapper.updateInfoSns(member);
		} else {
			mapper.updateInfo(member);
		}
	}

	@Override
	public boolean phoneDuplicateCheck(MemberRegist memberDTO) {
		Member member = new Member();
		member.setPhone(memberDTO.getPhone1() + memberDTO.getPhone2() + memberDTO.getPhone3());
		int count = mapper.phoneDuplicateCheck(member);
		return count > 0;
	}

	@Override
	public Member loginCheck(Member member) {
		String savedPass = mapper.passCompare(member);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		boolean isMatch = encoder.matches(member.getPw(), savedPass);
		System.out.println(isMatch);
		if (!isMatch) {
			return null;
		}
		try {

			Member userLogin = mapper.loginCheck(member);
			return userLogin; // 중복됐으면 false 중복이 아니며true
		} catch (Exception e) {
			log.error("User CheckRegist Error: {}", e.getMessage());
			throw new RuntimeException("중복 체크 실패", e);
		}
	}

	@Override
	public Member selectMemberByNo(Member member) {
		member = mapper.getMemberInfoByNo(member);
		return member;
	}

	@Override
	public boolean snsUserCheck(Member member) {
		int count = mapper.snsRegisteredCheck(member);
		return (count > 0) ? true : false;
	}

	@Override
	public Member selectSnsInfo(Member member) {
		member = mapper.getSnsInfo(member);
		return member;
	}

	@Override
	public boolean passCheck(Member member) {
		String savedPass = mapper.passCompare(member);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		boolean isMatch = encoder.matches(member.getPw(), savedPass);
		return isMatch;
	}

	@Override
	public void deleteMember(Member member) {
		mapper.deleteMemeber(member);
	}

	@Override
	public boolean passCheckNo(Member member) {
		String savedPass = mapper.passCompareNo(member);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		boolean isMatch = encoder.matches(member.getPw(), savedPass);
		return isMatch;
	}

	// Content-Type을 기반으로 파일 확장자 반환
	private static String getFileExtension(String contentType) {
		switch (contentType) {
		case "image/png":
			return ".png";
		case "image/gif":
			return ".gif";
		case "image/webp":
			return ".webp";
		case "image/bmp":
			return ".bmp";
		case "image/svg+xml":
			return ".svg";
		default:
			return ".jpg"; // 기본값
		}
	}
}
