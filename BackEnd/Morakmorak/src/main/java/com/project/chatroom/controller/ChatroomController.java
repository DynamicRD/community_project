package com.project.chatroom.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.chatroom.model.Chatroom;
import com.project.chatroom.service.ChatroomService;

@RestController
@RequestMapping("/chatroom")
public class ChatroomController {
    @Autowired
    private ChatroomService service;

    // Firebase에서 전송된 메시지를 받아 오라클 DB에 저장
    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveMessage(@RequestBody Chatroom chatroom) {
        System.out.println("DB저장 검사" +chatroom.toString());
    	service.saveChatroom(chatroom);
    	Map<String, String> response = new HashMap<>();
        response.put("message", "Message saved to Oracle DB");

        // JSON 형식으로 응답 반환
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/check_duplicate")
    public boolean checkDuplicate(@RequestBody String firebaseMessageId) {
    	System.out.println("중복성 검사"+firebaseMessageId);
        return service.checkDuplicate(firebaseMessageId);
    }
}
