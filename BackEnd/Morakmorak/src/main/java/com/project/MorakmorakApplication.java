package com.project;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.project.member.mapper") // 패키지 스캔 등록
@MapperScan("com.project.visitlog.mapper") // 패키지 스캔 등록
@MapperScan("com.project.group1.mapper") // 패키지 스캔 등록
@MapperScan("com.project.announcements.mapper") // 패키지 스캔 등록
@MapperScan("com.project.review.mapper") // 패키지 스캔 등록
@MapperScan("com.project.mypage.mapper") // 패키지 스캔 등록
@MapperScan("com.project.admin.mapper") // 패키지 스캔 등록
public class MorakmorakApplication {

	public static void main(String[] args) {
		SpringApplication.run(MorakmorakApplication.class, args);
	}

}
