import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import GroupList from './group/GroupList';
import GroupDetail from './group/GroupDetail';
import GroupRegist from './group/GroupRegist';
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
import Signup from './login/Signup';
import Login from './login/login';


function App() {
  const [count, setCount] = useState(0);
  const groupList = [
    {
      g_title:'title',
      comment1:'소개',
      start_date:'시작일',
    },
    {
      g_title:'title2',
      comment1:'소개2',
      start_date:'시작일2',
    },
    {
      g_title:'title3',
      comment1:'소개3',
      start_date:'시작일3',
    }
  ]

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

          {/* 모임페이지-해원 */}
          <Route path="/group/detail" element={<GroupDetail />} />
          <Route path="/group/list" element={<GroupList groupList={groupList}/>} />
          <Route path="/group/regist" element={<GroupRegist />} />

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
          {/* 로그인-신지호 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
