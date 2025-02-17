package com.project.common.interceptor;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.project.visitlog.model.VisitLog;
import com.project.visitlog.service.VisitService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class VisitInterceptor implements HandlerInterceptor {

	@Autowired
	private VisitService service;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String ipAddress = request.getRemoteAddr(); // IP 주소 추출
		String requestURI = request.getRequestURI(); // 요청 URI 추출

		// 정적 리소스를 제외한 URI만 기록
		if (isStaticResource(requestURI)) {
			return true; // 정적 리소스는 기록하지 않고 요청 처리 계속 진행
		}

		// 요청 URI가 동적 페이지이면 방문 기록을 저장
		LocalDateTime visitTime = LocalDateTime.now();
		VisitLog visitLog = new VisitLog(ipAddress, requestURI, visitTime);

		// 방문 기록을 저장
		service.insert(visitLog);
//		System.out.println(visitLog);

		// 요청 처리 계속 진행
		return true;
	}

	private boolean isStaticResource(String requestURI) {
		// 정적 리소스 제외
		return requestURI.startsWith("/css/") || requestURI.startsWith("/js/") || requestURI.startsWith("/image/")
				|| requestURI.startsWith("/static/") || requestURI.startsWith("/public/")
				|| requestURI.startsWith("/resources/") || requestURI.equals("/favicon.ico");
	}
}
