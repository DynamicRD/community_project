package com.project.member.model;


import lombok.Data;

@Data
public class MemberRegist {
	private int no;
    private String id;
    private String nickname;
    private String pass;
    private String repass;
    private String name;
    private String gender;
    private String phone1;
    private String phone2;
    private String phone3;
    private String birth;
    private String email;
    private String addcode;
    private String address01;
    private String address02;
    private String providerId;
    private String provider;
}
