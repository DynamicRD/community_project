package com.project.chatroom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.chatroom.mapper.ChatroomMapper;
import com.project.chatroom.model.Chatroom;



@Service
public class ChatroomServiceImpl implements ChatroomService {

    @Autowired
    private ChatroomMapper mapper;

    // Firebase에서 메시지를 받아서 오라클 DB에 저장하는 메서드
    public void saveChatroom(Chatroom chatroom) {
    	if (!checkDuplicate(chatroom.getFirebaseMessageId())) {
    		mapper.insertChatroom(chatroom);
    	} else {
            System.out.println("Duplicate Chatroom detected, not saving.");
        }
    }
    
    // 중복 메시지 확인
    public boolean checkDuplicate(String firebaseChatroomId) {
        return mapper.checkDuplicate(firebaseChatroomId);
    }

  
}