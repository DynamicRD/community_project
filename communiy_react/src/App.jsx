import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Navbar from './mainpage/Navbar';
import Footer from './mainpage/Footer';
import Home from './mainpage/Home';
import MyPage from './mypage/mypage';
import MyInfoChange from './mypage/MyInfoChange';
import MyProfileChange from './mypage/MyProfileChange';
import MyInfoDelete from './mypage/MyInfoDelete';
import MyAmountHistory from './mypage/MyAmountHistory';
import MyReviews from './mypage/MyReviews';
import MyAmountCharge from './mypage/MyAmountCharge';
import Checkout from './mypage/tosspay/Checkout';
import SuccessPage from './mypage/tosspay/Success';
import FailPage from './mypage/tosspay/Fail';
import AddressInput from './mypage/daumAPI/AddressInput';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          {/*메인페이지-신하윤*/}
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
          <Route path="/mypage/infochange/address" element={<AddressInput />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
