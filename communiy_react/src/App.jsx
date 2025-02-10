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

const today = new Date();
const formattedDate = `${today.getFullYear()}년 ${
  today.getMonth() + 1
}월 ${today.getDate()}일`;

const reviewList = [
  {
    no: 1,
    title: '안녕하세요',
    writer: '문정배',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...',
    rating: 0,
    tag: 'culture',
  },
  {
    no: 2,
    title: '안녕하세요2',
    writer: '문정배2',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...',
    rating: 1,
    tag: 'culture2',
  },
  {
    no: 3,
    title: '안녕하세요3',
    writer: '문정배3',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...',
    rating: 2,
    tag: 'culture3',
  },
  {
    no: 4,
    title: '안녕하세요4',
    writer: '문정배4',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...4',
    rating: 3,
    tag: 'culture4',
  },
  {
    no: 5,
    title: '안녕하세요5',
    writer: '문정배5',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...5',
    rating: 4,
    tag: 'culture5',
  },
  {
    no: 6,
    title: '안녕하세요13',
    writer: '문정배6',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...6',
    rating: 5,
    tag: 'culture6',
  },
];
const announcementList = [
  {
    no: 1,
    title: '문정배에 대한 고찰',
    content: '문정배 최고라고 생각합니다1',
    date: formattedDate,
  },
  {
    no: 2,
    title: '문정배에 대한 고찰',
    content:
      ' 문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배   ',
    date: formattedDate,
  },
  {
    no: 3,
    title: '문정배에 대한 고찰',
    content: '문정배 최고라고 생각합니다3',
    date: formattedDate,
  },
  {
    no: 4,
    title: '문정배에 대한 고찰',
    content: '문정배 최고라고 생각합니다4',
    date: formattedDate,
  },
  {
    no: 5,
    title: '문정배에 대한 고찰',
    content: '문정배 최고라고 생각합니다5',
    date: formattedDate,
  },
];

function App() {
  const [count, setCount] = useState(0);
  const [reviewData, setReviewData] = useState(reviewList);
  const [announcementData, setAnnouncementData] = useState(announcementList);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* 모임페이지-해원 */}

          <Route path="/group/detail" element={<GroupDetail reviewData={[...reviewData]}/>} />
          <Route path="/group/regular_list" element={<GroupList type={'regular'}/>} />
          <Route path="/group/one_list" element={<GroupList type={'one'}/>} />
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
          <Route
            path="/mypage/reviews"
            element={<MyReviews reviewData={[...reviewData]} />}
          />
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
          <Route
            path="/review"
            element={<Review reviewData={[...reviewData]} />}
          />
          <Route
            path="/review/Read"
            element={<Read reviewData={[...reviewData]} />}
          />
          <Route path="/review/Regist" element={<Regist />} />

          {/* 공지사항 - 문정배 */}
          <Route
            path="/announcements"
            element={
              <Announcements_notice announcementData={[...announcementData]} />
            }
          />
          <Route
            path="/announcements/faq"
            element={
              <Announcements_faq announcementData={[...announcementData]} />
            }
          />
          <Route
            path="/announcements/read"
            element={
              <Announcements_notice_read
                announcementData={[...announcementData]}
              />
            }
          />

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
