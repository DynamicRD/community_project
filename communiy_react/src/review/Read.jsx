import React, { useState } from 'react';
import { Button, Container, Nav } from 'react-bootstrap';

import './Read.css';
import HorizonLine from './HorizonLine';
import { useNavigate } from 'react-router';

const reviewData = [
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

export default function Read() {
  const navigate = useNavigate();
  const [content, setContent] = useState();
  const onChangeTextArea = (e) => {
    setContent(e.target.value);
  };
  const today = new Date();
  const count = 30;

  const reviewData = [
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
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  const getStarImages = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '/images/star.png' : '/images/emptyStar.png');
    }
    return stars;
  };
  const completedMeetings = [
    {
      name: '테크 세미나',
      date: '2025-01-10',
      endDate: '2025-01-10',
      role: '참석자',
      cost: '₩ 30,000',
    },
    {
      name: '사진 동아리',
      date: '2025-01-15',
      endDate: '2025-01-15',
      role: '모임장',
      cost: '₩ 20,000',
    },
    {
      name: '사진 동아리',
      date: '2025-01-15',
      endDate: '2025-01-15',
      role: '모임장',
      cost: '₩ 20,000',
    },
    {
      name: '사진 동아리',
      date: '2025-01-15',
      endDate: '2025-01-15',
      role: '모임장',
      cost: '₩ 20,000',
    },
  ];

  const replyList = [
    {
      reply_title: '문정배1',
      reply_content: '문정배 최고1',
    },
    {
      reply_title: '문정배2',
      reply_content: '문정배 최고2',
    },
    {
      reply_title: '문정배3',
      reply_content: '문정배 최고3',
    },
    {
      reply_title: '문정배4',
      reply_content: '문정배 최고4',
    },
  ];

  return (
    <Container>
      <div className="review_header">
        <div className="review_title">
          <p style={{ fontSize: '33px' }}>
            <b>{reviewData[5].title}</b>
            <span
              style={{ fontSize: '13px' }}
              className="mt-2 ms-2 text-black-50"
            >
              {completedMeetings[0].name}
            </span>
          </p>

          <div className="review_writer ms-2">
            <span>{reviewData[5].writer}</span>
            <span> 조회수 : {count}</span>
          </div>
        </div>
        <HorizonLine />
        <div className="review_body ">
          <div className="d-flex justify-content-between m-3">
            <Nav.Link href="/review" className="reviewBoardLink">
              {'>'} 리뷰게시판
            </Nav.Link>
            <span style={{ fontSize: '12px' }}>
              평점&nbsp;:&nbsp;
              {getStarImages(reviewData[5].rating).map((star, index) => (
                <img key={index} src={star} alt="star" className="star" />
              ))}
            </span>
          </div>
          <div className="review_image">
            <img
              src={reviewData[5].img}
              alt="detail"
              className="review_image mb-4"
            />
          </div>
          <div className="review_main">{reviewData[5].content}</div>
          <div className="review_list">
            <Nav.Link href="/review">
              <span>목록</span>
            </Nav.Link>
          </div>
        </div>

        <div className="mt-3">
          <form action="#">
            <div className="mb-2 mt-3">
              <Container>
                <div className="d-flex flex-column justify-content-between">
                  <span className="reply_hr mt-3 mb-3"></span>
                </div>
              </Container>
              <label htmlFor="comment" className="mb-3 ms-2">
                댓글
              </label>
              <textarea
                className="form-control"
                rows="5"
                id="comment"
                name="text"
                value={content}
                onChange={onChangeTextArea}
              ></textarea>
            </div>

            <Button
              className="register_btn ms-3"
              onClick={() => {
                const form = new FormData();
                form.append('content', content);
                fetch('http://localhost:8080/review/reply', {
                  method: 'post',
                  body: form,
                }).then(() => {
                  navigate('/review/Home');
                });
              }}
            >
              작성
            </Button>
          </form>
        </div>

        {/* reply */}

        {replyList.map((object, idx) => (
          <Container key={idx}>
            <div className="writer mt-4 mb-3">
              <span>
                <b>{object.reply_title}</b>
              </span>
            </div>
            <div className="review_content">
              <p className="m-1 review_p">{object.reply_content}</p>
              <p className="m-1 review_p" id="review_date">
                {formattedDate}
              </p>
            </div>
            <HorizonLine />
          </Container>
        ))}
      </div>
    </Container>
  );
}
