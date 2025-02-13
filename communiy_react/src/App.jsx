import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // ✅ AuthProvider 추가

import '/src/Admin/dashboard/dashboard.css';
import './App.css';

import Home from './mainpage/Home';
import Signup from './login/Signup';
import Login from './login/Login';
import UserLayout from './routes/UserLayout';
import AdminLayout from './routes/AdminLayout';

// ✅ 유저 관련 컴포넌트
import GroupList from './group/GroupList';
import GroupDetail from './group/GroupDetail';
import GroupRegist from './group/GroupRegist';
import GroupUpdate from './group/GroupUpdate';
import GroupManagement from './group/GroupManagement';
import MyPage from './mypage/MyPage';
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
import AnnouncementsNotice from './announcements/Announcements_notice';
import AnnouncementsFaq from './announcements/Announcements_faq';
import AnnouncementsNoticeRead from './announcements/Announcements_notice_read';
import GoogleLoginCheck from './login/GoogleLoginCheck';
import GoogleSignup from './login/GoogleSignup';
import Read from './review/Read';
import Review from './review/Review';
import Regist from './review/Regist';
import ChatRoom from './chatroom/Chatroom';
import WishList from './wishlist/wishlist';
import FindId from './login/FindId';
import FindPwd from './login/FindPwd';
import ResetPassword from './login/ResetPassword';

// ✅ 관리자 관련 컴포넌트
import Dashboard from './Admin/dashboard/dashboard';
import UserTable from './Admin/Users/UserTable';
import Community from './Admin/Community/Community';
import CommunityDetail from './Admin/Community/CommunityDetail';
import Complaint from './Admin/Complaint/Complaint';
import Board from './Admin/Board/Board';
import ReviewDetail from './Admin/Board/ReviewDetail';
import Stats from './Admin/Stats/Stats';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ 유저 레이아웃 */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 모임 관련 */}
            <Route path="/group/detail" element={<GroupDetail />} />
            <Route path="/group/regular_list" element={<GroupList type="regular" />} />
            <Route path="/group/one_list" element={<GroupList type="one" />} />
            <Route path="/group/regist" element={<GroupRegist />} />
            <Route path="/group/update" element={<GroupUpdate />} />
            <Route path="/group/management" element={<GroupManagement />} />

            {/* 마이페이지 관련 */}
            <Route path="/mypage/:idx" element={<MyPage />} />
            <Route path="/mypage/infochange/:idx" element={<MyInfoChange />} />
            <Route path="/mypage/profilechange/:idx" element={<MyProfileChange />} />
            <Route path="/mypage/infodelete/:idx" element={<MyInfoDelete />} />
            <Route path="/mypage/amounthis/:idx" element={<MyAmountHistory />} />
            <Route path="/mypage/reviews/:idx" element={<MyReviews />} />
            <Route path="/mypage/charge/:idx" element={<MyAmountCharge />} />
            <Route path="/mypage/checkout/:idx" element={<Checkout />} />
            <Route path="/mypage/checkout/success/:idx" element={<SuccessPage />} />
            <Route path="/mypage/checkout/fail/:idx" element={<FailPage />} />
            <Route path="/mypage/infochange/address" element={<AddressInput />} />

            {/* 채팅 */}
            <Route path="/chatroom" element={<ChatRoom />} />

            {/* 소셜 로그인 */}
            <Route path="/login/googlecheck" element={<GoogleLoginCheck />} />
            <Route path="/google/signup" element={<GoogleSignup />} />

            {/* 리뷰게시판 */}
            <Route path="/review" element={<Review />} />
            <Route path="/review/read" element={<Read />} />
            <Route path="/review/regist" element={<Regist />} />

            {/* 공지사항 */}
            <Route path="/announcements" element={<AnnouncementsNotice />} />
            <Route path="/announcements/faq" element={<AnnouncementsFaq />} />
            <Route path="/announcements/read" element={<AnnouncementsNoticeRead />} />

            {/* 찜 목록 */}
            <Route path="/favorites" element={<WishList />} />

            {/* 아이디, 비밀번호 찾기 */}
            <Route path="/find-id" element={<FindId />} />
            <Route path="/find-password" element={<FindPwd />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
          </Route>

          {/* ✅ 관리자 관련 라우트 */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserTable />} />
            <Route path="community" element={<Community />} />
            <Route path="community/:idx" element={<CommunityDetail />} />
            <Route path="complaint" element={<Complaint />} />
            <Route path="board" element={<Board />} />
            <Route path="board/:reviewid" element={<ReviewDetail />} />
            <Route path="stats" element={<Stats />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
