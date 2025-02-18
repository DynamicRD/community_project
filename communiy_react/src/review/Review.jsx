import React, { useContext, useEffect, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { AuthContext } from '../context/AuthContext'; //

import './Review.css';

export default function Review() {
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
  //import { AuthContext } from '../context/AuthContext'; //
  const { isAuthenticated, userData } = useContext(AuthContext);
  const [reviewList, setReviewList] = useState([]); // reviewList를 먼저 선언
  const [groupedReviews, setGroupedReviews] = useState([]);

  // groupedReviews 상태 추가 (바뀐 부분)/ reviewList를 먼저 선언

  // 리뷰값 DB에서 가져오기
  function getList(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReviewList(data);
        console.log(data);
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
            {groupedReviews.length !== null || 0 ? (
              groupedReviews.map((group, index) => (
                <divs
                  className="d-flex justify-content-start gap-5 mb-4"
                  key={index}
                >
                  {group.map((object) => (
                    <div className="review_item" key={object.REVIEW_TITLE}>
                      <div
                        className="club_name d-flex align-content-cetner ms-4 mb-1"
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        {object.GROUP_TITLE}
                      </div>
                      <Nav.Link href={`/review/read/${object.REVIEW_NO}`}>
                        <img
                          src={`/images/${object.IMG_URL}`}
                          alt="review"
                          className="review_img"
                        />
                      </Nav.Link>

                      <div className="d-flex justify-content-between align-content-center mt-2 me-4 ms-4">
                        <Nav.Link href={`/review/read/${object.REVIEW_NO}`}>
                          {object.REVIEW_TITLE}
                        </Nav.Link>
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
              ))
            ) : (
              <span>
                <b>작성된 리뷰가 없습니다</b>
              </span>
            )}
          </ul>
        </div>
      </Container>
      <Container>
        {isAuthenticated ? (
          <div className="d-flex justify-content-center align-content-center mb-3 ms-5">
            <Pagination size="sm">{item}</Pagination>
            <Nav.Link
              href={`/mypage/reviews/${userData?.no}`}
              className="reviewRegist"
            >
              <span>작성 하기</span>
            </Nav.Link>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-content-center mb-3 ms-5">
            <Pagination size="sm">{item}</Pagination>
            <Nav.Link href="/" className="reviewRegist">
              <span>홈으로</span>
            </Nav.Link>
          </div>
        )}
      </Container>
    </>
  );
}
