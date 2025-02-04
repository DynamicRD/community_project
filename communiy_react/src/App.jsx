import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import MyPage from './mypage/mypage';
import Home from './Home';
import MyInfoChange from './mypage/MyInfoChange';
import MyProfileChange from './mypage/MyProfileChange';
import MyInfoDelete from './mypage/MyInfoDelete';
import MyAmountHistory from './mypage/MyAmountHistory';
import MyReviews from './mypage/MyReviews';
import MyAmountCharge from './mypage/MyAmountCharge';
import Checkout from './mypage/tosspay/Checkout';
import SuccessPage from './mypage/tosspay/Success';
import FailPage from './mypage/tosspay/Fail';

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
          <Route path="/mypage/profilechange" element={<MyProfileChange />} />
          <Route path="/mypage/infodelete" element={<MyInfoDelete />} />
          <Route path="/mypage/amounthis" element={<MyAmountHistory />} />
          <Route path="/mypage/reviews" element={<MyReviews />} />
          <Route path="/mypage/charge" element={<MyAmountCharge />} />
          <Route path="/mypage/checkout" element={<Checkout />} />
          <Route path="/mypage/checkout/success" element={<SuccessPage />} />
          <Route path="/mypage/checkout/fail" element={<FailPage />} />
          {/* 김동욱 chatroom*/}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
