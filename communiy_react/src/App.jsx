import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import '/src/Admin/dashboard/dashboard.css';
import './App.css';
import Home from './mainpage/Home';
import Signup from './login/Signup';
import Login from './login/login';
import UserLayout from './routes/UserLayout';
import AdminLayout from './routes/AdminLayout';
import ProtectedRoute from './routes/ProtectedRoute';

// ✅ 유저 관련 컴포넌트
import GroupList from './group/GroupList';
import GroupDetail from './group/GroupDetail';
import GroupRegist from './group/GroupRegist';
import GroupUpdate from './group/GroupUpdate';
import GroupManagement from './group/GroupManagement';

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

import ChatRoom from './chatroom/chatroom';
import Announcements_notice from './announcements/Announcements_notice';
import Announcements_faq from './announcements/Announcements_faq';
import Announcements_notice_read from './announcements/Announcements_notice_read';

import GoogleLoginCheck from './login/GoogleLoginCheck';
import GoogleSignup from './login/GoogleSignup';

import Read from './review/Read';
import Review from './review/Review';
import Regist from './review/Regist';

// ✅ 관리자 관련 컴포넌트
import Dashboard from './Admin/dashboard/dashboard';
import UserTable from './Admin/Users/UserTable';
import Community from './Admin/Community/Community';
import CommunityDetail from './Admin/Community/CommunityDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 페이지 */}
        <Route path="/user" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ 유저 페이지 (UserLayout을 부모로 설정) */}
        <Route path="/user/*" element={<UserLayout />}>
          {/* 모임 관련 */}
          <Route index element={<Home />} /> {/* ✅ 기본 페이지 추가 */}
          <Route path="group/detail" element={<GroupDetail />} />
          <Route path="group/regular_list" element={<GroupList />} />
          <Route path="group/one_list" element={<GroupList />} />
          <Route path="group/regist" element={<GroupRegist />} />
          <Route path="group/update" element={<GroupUpdate />} />
          <Route path="group/management" element={<GroupManagement />} />
          {/* 마이페이지 관련 */}
          <Route path="mypage" element={<MyPage />} />
          <Route path="mypage/infochange" element={<MyInfoChange />} />
          <Route path="mypage/profilechange" element={<MyProfileChange />} />
          <Route path="mypage/infodelete" element={<MyInfoDelete />} />
          <Route path="mypage/amounthis" element={<MyAmountHistory />} />
          <Route path="mypage/reviews" element={<MyReviews />} />
          <Route path="mypage/charge" element={<MyAmountCharge />} />
          <Route path="mypage/checkout" element={<Checkout />} />
          <Route path="mypage/checkout/success" element={<SuccessPage />} />
          <Route path="mypage/checkout/fail" element={<FailPage />} />
          <Route path="mypage/infochange/address" element={<AddressInput />} />
          {/* 채팅 */}
          <Route path="chatroom" element={<ChatRoom />} />
          <Route path="login/googlecheck" element={<GoogleLoginCheck />} />
          <Route path="google/signup" element={<GoogleSignup />} />
          {/* 리뷰게시판 */}
          <Route path="review" element={<Review />} />
          <Route path="review/read" element={<Read />} />
          <Route path="review/regist" element={<Regist />} />
          {/* 공지사항 */}
          <Route path="announcements" element={<Announcements_notice />} />
          <Route path="announcements/faq" element={<Announcements_faq />} />
          <Route
            path="announcements/read"
            element={<Announcements_notice_read />}
          />
        </Route>

        {/* ✅ 관리자 페이지 (ProtectedRoute로 보호) */}

        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<Dashboard />} /> {/* ✅ 기본 페이지 설정 */}
          <Route path="dashboard" element={<Dashboard />} />{' '}
          {/* ✅ 상대 경로 사용 */}
          <Route path="users" element={<UserTable />} />
          <Route path="community" element={<Community />} />
          <Route path="community/:id" element={<CommunityDetail />} />
          {/* <Route path="complaint" element={<Complaint />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
