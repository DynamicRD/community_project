import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import './WishList.css';
import { AuthContext } from '../context/AuthContext';

import WishListItem from './WishListItem';
import { useNavigate } from 'react-router';

export default function WishList() {
  let item = [];
  for (let number = 1; number <= 5; number++) {
    item.push(
      <Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>
    );
  }

  const { isAuthenticated, userData } = useContext(AuthContext);
  const [favoriteList, setFavoriteList] = useState([]); // reviewList를 먼저 선언
  const navigate = useNavigate();

  // 리뷰값 DB에서 가져오기
  function getList(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFavoriteList(data);
      });
  }

  // 페이지 시작 시 getList 호출
  useEffect(() => {
    if (!userData) return;

    getList(`http://localhost:8080/favorites/${userData?.no}`);
    console.log(userData?.no);
  }, [userData]);

  //페이징
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pageRangeStart, setPageRangeStart] = useState(0); // 페이지 범위 시작
  const [pageRangeEnd, setPageRangeEnd] = useState(5); // 페이지 범위 끝
  const reviewsPerPage = 4; //현재 페이지 내 보여줄 리스트 개수

  //한페이지 내 들어갈 리스트 범위를 설정 후 배열로 지정
  const [groupedFavorite, setGroupedFavorite] = useState([]);
  useEffect(() => {
    const groupFavorite = [];
    for (let i = 0; i < favoriteList.length; i += reviewsPerPage) {
      groupFavorite.push(favoriteList.slice(i, i + reviewsPerPage));
    }
    setGroupedFavorite(groupFavorite);
  }, [favoriteList]);

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // 이전 페이지로 이동
  const handlePrevPage = () => {
    const newPageRangeStart = pageRangeStart - 5;
    const newPageRangeEnd = newPageRangeStart + 5;
    if (newPageRangeStart >= 0) {
      setPageRangeStart(newPageRangeStart);
      setPageRangeEnd(newPageRangeEnd);
      setCurrentPage(pageRangeStart - 4); // 현재 페이지를 범위의 첫 번째 페이지로 설정
    }
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    const newPageRangeStart = pageRangeStart + 5;
    const newPageRangeEnd = newPageRangeStart + 5;
    if (newPageRangeStart < favoriteList.length) {
      setPageRangeStart(newPageRangeStart);
      setPageRangeEnd(newPageRangeEnd);
      setCurrentPage(pageRangeStart + 6); // 5 페이지씩 건너뛰고 이동
    }
  };

  //현재 페이지에서 내가 출력하고자 하는 리뷰의 개수를 함수를 통해 groupedReviews[currentPage - 1] 조절 한 뒤 currentReviews에 저장
  const currentReviews = groupedFavorite[currentPage - 1] || [];

  return (
    <Container>
      {isAuthenticated !== true ? (
        <></>
      ) : (
        <>
          <div className=" d-flex m-5 ">
            <span
              className="nav_notice"
              style={{ fontSize: '33px', marginLeft: '65px' }}
            >
              찜 목록
            </span>
          </div>
          <div className="wishList">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {groupedFavorite.length > 0 ? (
                currentReviews.map((item) => (
                  <WishListItem key={item.BASKET_NO} item={item} />
                ))
              ) : (
                <div className="d-flex justify-content-center w-100">
                  <span className="WishListNo_meetings m-5">
                    찜한 모임이 없습니다.
                  </span>
                </div>
              )}
            </div>
            <div className="custom-pagination d-flex justify-content-center align-content-center mb-4 mt-4">
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
                  if (pageNumber <= groupedFavorite.length) {
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
                {pageRangeEnd < groupedFavorite.length && (
                  <Pagination.Next
                    onClick={handleNextPage}
                    disabled={pageRangeEnd >= groupedFavorite.length}
                  />
                )}
              </Pagination>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
