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
import Read from './review/Read';
import Review from './review/Review';
import Regist from './review/Regist';
import Signup from './login/Signup';

import Login from './login/login';
import GroupUpdate from './group/GroupUpdate';
import GroupManage from './group/GroupManagement';
import GroupManagement from './group/GroupManagement';

import Announcements_notice from './announcements/Announcements_notice';
import Announcements_faq from './announcements/Announcements_faq';
import Announcements_notice_read from './announcements/Announcements_notice_read';
import GoogleLoginCheck from './login/GoogleLoginCheck';
import Test from './login/Test';

import { ContactUs } from './review/test';
import GoogleSignup from './login/GoogleSignup';
import ChatRoom from './chatroom/Chatroom';
import FindId from './login/FindId';
import FindPwd from './login/FindPwd';
import ResetPassword from './login/ResetPassword';
import WishList from './wishlist/wishlist';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* 모임페이지-해원 */}

          <Route path="/group/detail" element={<GroupDetail />} />
          <Route
            path="/group/regular_list"
            element={<GroupList type={'regular'} />}
          />
          <Route path="/group/one_list" element={<GroupList type={'one'} />} />

          <Route path="/group/regist" element={<GroupRegist />} />
          <Route path="/group/update" element={<GroupUpdate />} />
          <Route path="/group/management" element={<GroupManagement />} />

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
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/login/googlecheck" element={<GoogleLoginCheck />} />
          <Route path="/google/signup" element={<GoogleSignup />} />

          <Route path="/test" element={<Test />} />

          {/* 리뷰게시판 - 문정배*/}
          <Route path="/review" element={<Review />} />
          <Route path="/review/Read" element={<Read />} />
          <Route path="/review/Regist" element={<Regist />} />

          {/* 공지사항 - 문정배 */}
          <Route path="/announcements" element={<Announcements_notice />} />
          <Route path="/announcements/faq" element={<Announcements_faq />} />
          <Route
            path="/announcements/read"
            element={<Announcements_notice_read />}
          />

          {/* 찜목록 */}
          <Route path="/favorites" element={<WishList />} />

          {/* 로그인-신지호 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* 아이디, 비밀번호 찾기 */}
          <Route path="/find-id" d-pas element={<FindId />} />
          <Route path="/find-password" element={<FindPwd />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
