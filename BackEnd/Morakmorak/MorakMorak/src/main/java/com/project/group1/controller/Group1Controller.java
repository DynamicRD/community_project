package com.project.group1.controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.group1.service.Group1Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/group")
public class Group1Controller {
	@Autowired
	private Group1Service service;

	@RequestMapping("/insert")
	public void insert(@RequestParam Map<String, Object> map) throws Exception {
		String startDateStr = (String) map.get("start_date");
		String lastDateStr = (String) map.get("last_date");

		DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
		LocalDateTime startDate = LocalDateTime.parse(startDateStr, formatter);
		LocalDateTime lastDate = LocalDateTime.parse(lastDateStr, formatter);

		// Convert UTC to KST (Korea Standard Time)
		ZonedDateTime startDateKST = startDate.atZone(ZoneId.of("UTC")).withZoneSameInstant(ZoneId.of("Asia/Seoul"));
		ZonedDateTime lastDateKST = lastDate.atZone(ZoneId.of("UTC")).withZoneSameInstant(ZoneId.of("Asia/Seoul"));

		map.put("start_date", Timestamp.valueOf(startDateKST.toLocalDateTime()));
		map.put("last_date", Timestamp.valueOf(lastDateKST.toLocalDateTime()));

		service.insert(map);
		log.info("insert");
	}

	@GetMapping("/list")
	public List<Map<String, Object>> list(@RequestParam(value = "type") String type) throws Exception {
		List<Map<String, Object>> data = service.list(type);

		// Convert UTC to KST
		for (Map<String, Object> item : data) {
			String startDate = (String) item.get("start_date");
			if (startDate != null) {
				ZonedDateTime startDateKST = ZonedDateTime
						.parse(startDate, DateTimeFormatter.ISO_DATE_TIME.withZone(ZoneId.of("UTC")))
						.withZoneSameInstant(ZoneId.of("Asia/Seoul"));
				item.put("start_date", startDateKST.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
			}

			String lastDate = (String) item.get("last_date");
			if (lastDate != null) {
				ZonedDateTime lastDateKST = ZonedDateTime
						.parse(lastDate, DateTimeFormatter.ISO_DATE_TIME.withZone(ZoneId.of("UTC")))
						.withZoneSameInstant(ZoneId.of("Asia/Seoul"));
				item.put("last_date", lastDateKST.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
			}
		}

		return data;
	}

	@RequestMapping("/detail")
	public Map<String, Object> read(@RequestParam(value = "g_id") String gId) throws Exception {
		return service.read(gId);
	}
	
	@RequestMapping("/update")
	public void update(@RequestParam(value = "g_id") String gId) throws Exception {
		service.update(gId);
	}
	
}