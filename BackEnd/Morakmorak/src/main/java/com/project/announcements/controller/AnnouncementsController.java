package com.project.announcements.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.announcements.service.FaqService;
import com.project.announcements.service.NoticeService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/announcements")
public class AnnouncementsController {
	
	@Autowired
	private NoticeService NoticeService;
	
	@Autowired
	private FaqService faqService;
	
	@GetMapping("/notice/list")
	public List<Map<String, Object>> noticeList() throws Exception {
		log.info("NoticeList");
		List<Map<String, Object>> Map = NoticeService.listNotice();
		return Map;
	}
	
	@PostMapping("/notice/insert")
	public void noticeInsert(@RequestParam Map<String, Object> map) throws Exception {
		log.info("valueNotice = " + map);
		NoticeService.insertNotice(map);
	}
	
	@GetMapping("/notice/read/{idx}")
	public Map<String, Object> noticeRead(@PathVariable(name = "idx") int idx) throws Exception{
		log.info("value = " + idx);
		return NoticeService.readNotice(idx);
	}
	
	@GetMapping("/faq/list")
	public List<Map<String, Object>> faqList() throws Exception {
		log.info("FaqList");
		List<Map<String, Object>> Map = faqService.listFaq();
		return Map;
	}
	
	@PostMapping("/faq/insert")
	public void faqInsert(@RequestParam Map<String, Object> map) throws Exception {
		log.info("valueFQA = " + map);
		faqService.insertFaq(map);
	}
	
	
}
