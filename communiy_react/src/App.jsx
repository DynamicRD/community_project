import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import MyPage from './mypage/mypage';
import Home from './Home';
import MyInfoChange from './mypage/MyInfoChange';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* mypage 컴포넌트 추가 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/infochange" element={<MyInfoChange />} />
          {/* 예시
          기초문법-길동팀원
          <Route path="/test" element={<Syntax />} />*/}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
