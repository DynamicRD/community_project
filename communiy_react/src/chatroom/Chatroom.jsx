import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function Chatroom() {
  //변수
  const url = 'http://localhost:8080/survey/view/1';

  return (
    <>
      <Container className="mt-5">
        <div className="text-center">
          <h2>채팅방에 오신 것을 환영합니다!</h2>
          <div id="messages"></div>
          <textarea
            id="messageContent"
            placeholder="메시지를 입력하세요..."
            onKeyDown="checkEnter(event)"
          ></textarea>
          <br />
          <button onClick="sendMessage()">전송</button>
        </div>
      </Container>
    </>
  );
}

export default Chatroom;
