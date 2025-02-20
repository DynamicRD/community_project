import React, { useContext, useEffect, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { AuthContext } from '../context/AuthContext';

import './Review.css';

export default function Review() {
  const getStarImages = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '/images/star.png' : '/images/emptyStar.png'); // 채워진 별과 비어 있는 별을 나눔
    }
    return stars;
  };

  const { isAuthenticated, userData } = useContext(AuthContext);
  const [reviewList, setReviewList] = useState([]);

  const [groupedReviews, setGroupedReviews] = useState([]);

  //페이징
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pageRangeStart, setPageRangeStart] = useState(0); // 페이지 범위 시작
  const [pageRangeEnd, setPageRangeEnd] = useState(5); // 페이지 범위 끝
  const reviewsPerPage = 6;

  // 리뷰값 DB에서 가져오기
  function getList(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReviewList(data);
        console.log(data);
      });
  }

  useEffect(() => {
    getList('http://localhost:8080/review/list');
  }, []);

  useEffect(() => {
    const groupReviews = [];
    for (let i = 0; i < reviewList.length; i += reviewsPerPage) {
      groupReviews.push(reviewList.slice(i, i + reviewsPerPage));
    }
    setGroupedReviews(groupReviews);
  }, [reviewList]);

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 이전 페이지로 이동
  const handlePrevPage = () => {
    if (pageRangeStart > 0) {
      setPageRangeStart(pageRangeStart - 5);
      setPageRangeEnd(pageRangeEnd - 5);
    }
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (pageRangeEnd < groupedReviews.length) {
      setPageRangeStart(pageRangeStart + 5);
      setPageRangeEnd(pageRangeEnd + 5);
    }
  };

  const currentReviews = groupedReviews[currentPage - 1] || [];

  return (
    <>
      <Container>
        <div className="d-flex m-5">
          <span
            className="nav_notice"
            style={{ fontSize: '33px', marginLeft: '65px' }}
          >
            모임 후기
          </span>
        </div>
        <div className="review_board mt-4">
          <ul
            id="board_list"
            className="list-unstyled d-flex justify-content-center"
          >
            {groupedReviews.length > 0 ? (
              <div className="review_board_list d-flex flex-wrap gap-5 mb-4">
                {currentReviews.map((object) => (
                  <div className="review_item" key={object.REVIEW_NO}>
                    <div
                      className="club_name d-flex mb-1"
                      style={{
                        fontSize: '14px',
                      }}
                    >
                      {object.GROUP_TITLE}
                    </div>
                    <Nav.Link href={`/review/read/${object.REVIEW_NO}`}>
                      <img
                        src={`http://localhost:8080/upload/${object.IMG_URL}`}
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
              </div>
            ) : (
              <div className="d-flex justify-content-center w-100">
                <span className="WishListNo_meetings m-5">
                  리뷰가 없습니다. 리뷰를 작성 해 주세요!
                </span>
              </div>
            )}
          </ul>
        </div>
      </Container>
      <Container>
        <div className="d-flex justify-content-center align-content-center mb-3 ms-5">
          <Pagination size="sm">
            {pageRangeStart < 5 ? (
              <>{null}</>
            ) : (
              <>
                <Pagination.Prev
                  onClick={handlePrevPage}
                  disabled={pageRangeStart === 0}
                />
              </>
            )}

            {Array.from({ length: 5 }, (_, index) => {
              const pageNumber = pageRangeStart + index + 1;
              if (pageNumber <= groupedReviews.length) {
                return (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                );
              }
              return null;
            })}
            {pageRangeEnd < groupedReviews.length && (
              <Pagination.Next
                onClick={handleNextPage}
                disabled={pageRangeEnd >= groupedReviews.length}
              />
            )}
          </Pagination>
          {isAuthenticated ? (
            <Nav.Link
              href={`/mypage/reviews/${userData?.no}`}
              className="reviewRegist"
            >
              <span>작성 하기</span>
            </Nav.Link>
          ) : (
            <Nav.Link href="/" className="reviewRegist">
              <span>홈으로</span>
            </Nav.Link>
          )}
        </div>
      </Container>
    </>
  );
}
