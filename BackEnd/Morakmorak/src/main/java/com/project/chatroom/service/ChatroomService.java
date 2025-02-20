package com.project.chatroom.service;

import com.project.chatroom.model.Chatroom;

public interface ChatroomService {


    // Firebase에서 메시지를 받아서 오라클 DB에 저장하는 메서드
    public void saveChatroom(Chatroom chatroom);
    
    // 중복 메시지 확인
    public boolean checkDuplicate(String firebaseMessageId);

  
}