import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

import './Review.css';


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

export default function Review() {
  let item = [];
  for (let number = 1; number <= 5; number++) {
    item.push(
      <Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>
    );
  }
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

  const getStarImages = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '/images/star.png' : '/images/emptyStar.png'); // 채워진 별과 비어 있는 별을 나눔
    }
    return stars;
  };

  // Group reviews into sets of 3 items per row
  const groupedReviews = [];
  for (let i = 0; i < reviewData.length; i += 3) {
    groupedReviews.push(reviewData.slice(i, i + 3));
  }

  return (
    <>
      <Container>
        <div className=" d-flex m-5">
          <span
            className="nav_notice"
            style={{ fontSize: '33px', marginLeft: '65px' }}
          >
            모임 후기
          </span>
        </div>
        <div className="review_board mt-4">
          <ul id="board_list" className="list-unstyled">
            {groupedReviews.map((group, index) => (
              <div
                className="d-flex justify-content-start gap-5 mb-4"
                key={index}
              >
                {group.map((object) => (
                  <div className="review_item" key={object.no}>
                    <div
                      className="club_name d-flex align-content-cetner ms-4 mb-1"
                      style={{
                        fontSize: '14px',
                      }}
                    >
                      {completedMeetings[0].name}
                    </div>
                    <Nav.Link href="/user/review/Read">
                      <img
                        src={object.img}
                        alt="review"
                        className="review_img"
                      />
                    </Nav.Link>

                    <div className="d-flex justify-content-between align-content-center mt-2 me-4 ms-4">
                      <Nav.Link href="/user/review/Read">
                        {object.title}
                      </Nav.Link>
                      <span style={{ fontSize: '12px' }}>
                        평점&nbsp;:&nbsp;
                        {getStarImages(object.rating).map((star, index) => (
                          <img
                            key={index}
                            src={star}
                            alt="star"
                            className="star"
                          />
                        ))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </Container>
      <Container>
        <div className="d-flex justify-content-center align-content-center mb-3">
          <Pagination size="sm">{item}</Pagination>
          <Nav.Link href="/mypage/reviews" className="reviewRegist">
            <span>작성 하기</span>
          </Nav.Link>
        </div>
      </Container>
    </>
  );
}
