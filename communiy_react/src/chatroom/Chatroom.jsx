import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

// Firebase 설정
const firebaseConfig = {
  apiKey: 'AIzaSyCpsIonFThw_LhjGhuGi7mBQWXZ0sEFAII',
  authDomain: 'fir-webchat-449010.firebaseapp.com',
  databaseURL: 'https://firebase-webchat-449010-default-rtdb.firebaseio.com',
  projectId: 'firebase-webchat-449010',
  storageBucket: 'firebase-webchat-449010.firebasestorage.app',
  messagingSenderId: '645439159513',
  appId: '1:645439159513:web:347b26ecabeb75e93492c8',
  measurementId: 'G-T3HFGFDTJ0',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database();

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const roomCode = '12345'; // 고정된 방 코드
  const sender = '김동욱'; // 고정된 발신자

  // Firebase에서 메시지 받아오기
  useEffect(() => {
    const messagesRef = database.ref(`chatrooms/${roomCode}/messages`);
    messagesRef.on('child_added', (snapshot) => {
      const message = snapshot.val();
      const firebaseMessageId = snapshot.key;

      if (message && message.sender && message.content) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...message, firebaseMessageId },
        ]);
      }
    });

    // Clean up listener on unmount
    return () => {
      messagesRef.off();
    };
  }, []);

  // 메시지 전송 함수
  const sendMessage = () => {
    const trimmedMessage = messageContent.trim();

    if (trimmedMessage) {
      const timestamp = new Date().getTime();
      const newMessage = {
        sender,
        content: trimmedMessage,
        timestamp,
        roomCode,
      };

      // Firebase에 메시지 저장
      const messagesRef = database.ref(`chatrooms/${roomCode}/messages`);
      const newMessageRef = messagesRef.push(newMessage);

      const firebaseMessageId = newMessageRef.key;

      // 메시지 전송 후 입력창 초기화
      setMessageContent('');

      // 오라클 DB에 메시지 저장 (중복 체크 후)
      fetch('/messages/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newMessage,
          firebaseMessageId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Message saved to Oracle DB:', data);
        })
        .catch((error) => {
          console.error('Error saving message to Oracle DB:', error);
        });
    }
  };

  // 엔터키로 메시지 전송
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div id="chat">
      <h2>채팅방에 오신 것을 환영합니다!</h2>
      <div id="messages">
        {messages.map((message, index) => {
          const localDate = new Date(message.timestamp);
          return (
            <div key={index} style={{ display: 'flex' }}>
              <span style={{ flex: 1 }}>
                {message.sender}: {message.content}
              </span>
              <span style={{ marginLeft: 'auto' }}>
                ({localDate.toLocaleString()})
              </span>
            </div>
          );
        })}
      </div>
      <textarea
        id="messageContent"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="메시지를 입력하세요..."
      />
      <br />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
};

export default ChatRoom;
