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

const reviewList = [
  {
    no: 1,
    title: '안녕하세요',
    writer: '문정배',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...',
    rating: 2,
    tag: 'culture',
  },
  {
    no: 2,
    title: '안녕하세요2',
    writer: '문정배2',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...',
    rating: 2,
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
    rating: 2,
    tag: 'culture4',
  },
  {
    no: 5,
    title: '안녕하세요5',
    writer: '문정배5',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...5',
    rating: 2,
    tag: 'culture5',
  },
  {
    no: 6,
    title: '안녕하세요13',
    writer: '문정배6',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...6',
    rating: 2,
    tag: 'culture6',
  },
];

function App() {
  const [count, setCount] = useState(0);
  const [reviewData, setReviewData] = useState(reviewList);

  return (
    <>
      <BrowserRouter>
        <Navbar />
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

          {/* 모임페이지-해원 */}
          <Route path="/group/detail" element={<GroupDetail />} />
          <Route path="/group/list" element={<GroupList />} />
          <Route path="/group/regist" element={<GroupRegist />} />

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
