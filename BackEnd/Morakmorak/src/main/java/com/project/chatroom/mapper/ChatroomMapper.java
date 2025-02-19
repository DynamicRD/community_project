package com.project.chatroom.mapper;

import com.project.chatroom.model.Chatroom;

public interface ChatroomMapper {


	public void insertChatroom(Chatroom chatroom);

	// 중복된 메시지가 있는지 확인하는 메서드
    boolean checkDuplicate(String firebaseMessageId);
}
