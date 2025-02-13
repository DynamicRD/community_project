package com.project.group1.controller;

import java.io.ByteArrayInputStream;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.group1.service.Group1Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/group")
public class Group1Controller {
    @Autowired
    private Group1Service service;

    @RequestMapping("/insert")
    public void insert(@RequestParam Map<String, Object> map,
                       @RequestParam("img_url1") MultipartFile img_url1,
                       @RequestParam("img_url2") MultipartFile img_url2,
                       @RequestParam("img_url3") MultipartFile img_url3) throws Exception {
        // 파일 처리 로직 추가
        if (!img_url1.isEmpty()) {
            // img_url1 파일 처리
        }
        if (!img_url2.isEmpty()) {
            // img_url2 파일 처리
        }
        if (!img_url3.isEmpty()) {
            // img_url3 파일 처리
        }
        service.insert(map);
    }

    @RequestMapping("/list")
    public List<Map<String, Object>> list(@RequestParam (value="type") String type) throws Exception {
        List<Map<String, Object>> map = service.list(type);

        // ISO 8601 형식의 날짜 포맷
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

        // List<Map<String, Object>>에서 모든 TIMESTAMP 필드 변환
        for (Map<String, Object> item : map) {
            for (Map.Entry<String, Object> entry : item.entrySet()) {
                if (entry.getValue() instanceof Timestamp) {
                    // Timestamp를 String으로 변환
                    Timestamp timestamp = (Timestamp) entry.getValue();
                    String formattedDate = sdf.format(timestamp);
                    item.put(entry.getKey(), formattedDate);
                } else if (entry.getValue() instanceof ByteArrayInputStream) {
                    // ByteArrayInputStream을 byte[] 배열로 변환
                    ByteArrayInputStream byteArrayInputStream = (ByteArrayInputStream) entry.getValue();
                    byte[] byteArray = byteArrayInputStream.readAllBytes();
                    item.put(entry.getKey(), byteArray);  // byte[]로 저장
                }
            }
        }
        return map;
    }
    
    @RequestMapping("/detail")
    public List<Map<String, Object>> read(@RequestParam (value="g_id") String gId) throws Exception {
        return service.read(gId);
    }
}