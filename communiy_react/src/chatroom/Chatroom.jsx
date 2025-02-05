import React, { useState, useEffect } from 'react';
// Firebase 모듈화된 방식으로 import
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onChildAdded, push } from 'firebase/database';
import { Container, Card, Form, Button, ListGroup } from 'react-bootstrap';

// Firebase 구성
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function ChatRoom() {
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);

  // Firebase에서 실시간으로 메시지를 가져오는 useEffect
  useEffect(() => {
    const messagesRef = ref(database, 'chatrooms/12345/messages');
    onChildAdded(messagesRef, (snapshot) => {
      const message = snapshot.val();
      const firebaseMessageId = snapshot.key;
      const localDate = new Date(message.timestamp);

      // 메시지를 화면에 추가
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: message.sender,
          content: message.content,
          timestamp: message.timestamp,
          firebaseMessageId,
          localDate,
        },
      ]);
    });

    return () => {
      // Firebase 연결 종료 코드 필요 (onChildAdded와 같은 이벤트 제거)
    };
  }, []);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (messageContent.trim()) {
      const roomCode = '12345'; // 방 코드
      const sender = '김동욱'; // 발신자 (예시)

      const newMessage = {
        sender,
        content: messageContent,
        timestamp: new Date().getTime(),
        roomCode,
      };

      const messagesRef = ref(database, 'chatrooms/' + roomCode + '/messages');
      const newMessageRef = push(messagesRef, newMessage);
      const firebaseMessageId = newMessageRef.key;

      // 메시지 전송 후 오라클 DB에 저장
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

      // 입력창 초기화
      setMessageContent('');
    }
  };

  // 엔터 키로 메시지 전송
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <h4>채팅방에 오신 것을 환영합니다!</h4>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {messages.map((message, index) => (
              <ListGroup.Item
                key={index}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <span>
                  {message.sender}: {message.content}
                </span>
                <small>{new Date(message.timestamp).toLocaleString()}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          <Form>
            <Form.Group controlId="messageContent">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="메시지를 입력하세요..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Form.Group>
            <Button variant="primary" onClick={sendMessage} block>
              전송
            </Button>
          </Form>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default ChatRoom;
