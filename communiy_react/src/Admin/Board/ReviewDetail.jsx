import { useParams, useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import '../../review/Read.css';
import HorizonLine from '../../review/HorizonLine';

export default function ReviewDetail() {
  const { reviewid } = useParams();
  console.log('Received reviewid:', reviewid);
  const reviewId = parseInt(reviewid, 10); // ✅ 문자열을 숫자로 변환
  console.log('Parsed reviewId:', reviewId);
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const onChangeTextArea = (e) => {
    setContent(e.target.value);
  };

  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  // 후기 데이터
  const reviewData = [
    {
      no: 1,
      title: '안녕하세요',
      writer: '문정배',
      img: '/images/review1.png',
      content: '이 모임을 통해 좋은 경험을 했어요!',
      rating: 4,
    },
    {
      no: 2,
      title: '배송이 빨라서 좋았어요.',
      writer: '문정배2',
      img: '/images/review2.png',
      content: '너무 좋은 모임이었어요.',
      rating: 5,
    },
    {
      no: 3,
      title: '가격 대비 만족스럽습니다.',
      writer: '문정배3',
      img: '/images/review1.png',
      rating: 2,
    },
    {
      no: 4,
      title: '다시 구매할 예정입니다.',
      writer: '문정배4',
      img: '/images/review1.png',
      rating: 3,
    },
    {
      no: 5,
      title: '디자인이 예뻐요!',
      writer: '문정배5',
      img: '/images/review1.png',
      rating: 4,
    },
    {
      no: 6,
      title: '품질이 정말 좋아요.',
      writer: '문정배6',
      img: '/images/review1.png',
      rating: 5,
    },
  ];

  // 댓글 데이터
  const replyList = [
    { reply_title: '김철수', reply_content: '정말 좋은 후기네요!' },
    { reply_title: '이영희', reply_content: '저도 참여하고 싶어요.' },
  ];

  // ✅ 리뷰 데이터 확인
  console.log('Review ID:', reviewId);
  console.log('Review Data:', reviewData);

  // reviewId에 해당하는 리뷰 찾기
  const review = reviewData.find((r) => r.no === reviewId);
  console.log('Matched Review:', review);

  if (!review) {
    return (
      <Container>
        <h3>해당 후기를 찾을 수 없습니다.</h3>
        <Button onClick={() => navigate('/board')}>목록으로 이동</Button>
      </Container>
    );
  }

  return (
    <Container className="pt-5 mt-5">
      <h2>{review.title}</h2>
      <p className="text-muted">작성자: {review.writer}</p>

      <div className="review_image text-center mb-4">
        <img src={review.img} alt="리뷰 이미지" className="img-fluid" />
      </div>

      <p>{review.content}</p>

      <HorizonLine />

      <h4>댓글</h4>
      {replyList.map((reply, idx) => (
        <Container key={idx} className="mb-3">
          <div>
            <b>{reply.reply_title}</b>
          </div>
          <div>{reply.reply_content}</div>
          <div className="text-muted">{formattedDate}</div>
          <HorizonLine />
        </Container>
      ))}
    </Container>
  );
}
