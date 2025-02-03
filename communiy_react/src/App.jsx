import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import MyPage from './mypage/mypage';
import Home from './Home';
import MyInfoChange from './mypage/MyInfoChange';
import ChatRoom from './chatroom/chatroom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 김동욱 mypage 컴포넌트 추가 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/infochange" element={<MyInfoChange />} />
          {/* 김동욱 chatroom*/}
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
