import React, { useEffect, useState } from 'react';
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

  // Pagination 아이템 생성
  let item = [];
  for (let number = 1; number <= 5; number++) {
    item.push(
      <Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>
    );
  }
  const [reviewList, setReviewList] = useState([]); // reviewList를 먼저 선언
  const [groupedReviews, setGroupedReviews] = useState([]);

  // groupedReviews 상태 추가 (바뀐 부분)/ reviewList를 먼저 선언

  // 리뷰값 DB에서 가져오기
  function getList(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReviewList(data);
      });
  }

  // 페이지 시작 시 getList 호출
  useEffect(() => {
    getList('http://localhost:8080/review/list');
  }, []);

  useEffect(() => {
    const groupReviews = [];
    for (let i = 0; i < reviewList.length; i += 3) {
      groupReviews.push(reviewList.slice(i, i + 3));
    }
    setGroupedReviews(groupReviews); // 그룹화된 리뷰 상태 업데이트 (바뀐 부분)
  }, [reviewList]);

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
              <divs
                className="d-flex justify-content-start gap-5 mb-4"
                key={index}
              >
                {group.map((object) => (
                  <div className="review_item" key={object.R_TITLE}>
                    <div
                      className="club_name d-flex align-content-cetner ms-4 mb-1"
                      style={{
                        fontSize: '14px',
                      }}
                    >
                      {completedMeetings[0].name}
                    </div>
                    <Nav.Link href={`/review/read/${object.R_ID}`} />
                    <Nav.Link href="/review/Read">
                      <img
                        src={`data:image/jpeg;base64,${object.IMG_URL}`}
                        alt="review"
                        className="review_img"
                      />
                    </Nav.Link>

                    <div className="d-flex justify-content-between align-content-center mt-2 me-4 ms-4">
                      <Nav.Link href={`/review/read/${object.R_ID}`}>
                        {object.R_TITLE}
                      </Nav.Link>
                      <Nav.Link href="/review/Read">{object.title}</Nav.Link>
                      <span style={{ fontSize: '12px' }}>
                        평점&nbsp;:&nbsp;
                        {console.log(object.STAR)}
                        {getStarImages(object.STAR).map((star, index) => (
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
              </divs>
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
