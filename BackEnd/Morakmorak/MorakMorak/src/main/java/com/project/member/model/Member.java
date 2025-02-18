package com.project.member.model;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Member {
    private int no; // 회원 고유 ID
    private int role; 
    private String id; // 자체 회원가입 ID
    private String pw; // 자체 회원가입 비밀번호
    private String email; // 이메일
    private String provider; // OAuth 제공자 (Google, Naver 등)
    private String providerId; // OAuth 제공자의 고유 ID
    private String phone; // 전화번호
    private String name; // 이름
    private String nickname; // 닉네임
    private String birth; // 생년월일
    private String gender; // 성별
    private Integer money = 0; // 소지금 (기본값 0)
    private String zipCode; // 우편번호
    private String addr1; // 기본 주소
    private String addr2; // 상세 주소
    private Integer starSum = 0; // 별점 총합
    private Integer black = 0; // 신고 횟수
    private LocalDate regDate; // 가입일 (기본값: 현재 날짜)
    private String imgUrl; // 프로필 사진 URL
    private String selfPr; // 자기소개
    private boolean rememberMe;
}
