package com.project.chatroom.model;

import lombok.Data;

@Data
public class Chatroom {
	private String sender;
    private String content;
    private long timestamp;
    private String roomCode; // 채팅방 코드 추가
    private String firebaseChatroomId;
}
