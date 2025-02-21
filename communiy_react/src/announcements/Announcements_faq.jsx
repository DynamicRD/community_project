import React, { useEffect, useRef, useState } from 'react';
import './Announcements_faq.css';
import { Container, Form, Nav, Pagination } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

export default function Announcements_faq() {
  let item = [];
  for (let number = 1; number <= 5; number++) {
    item.push(
      <Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>
    );
  }

  const [FaqList, setFaqList] = useState([]);
  //공지사항 값 DB에서 가져오기
  function getList(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFaqList(data);
      });
  }

  //페이지 시작 시 getList 호출
  useEffect(() => {
    getList('http://localhost:8080/announcements/faq/list');
  }, []);

  const [groupedFaq, setGroupedFaq] = useState([]);

  //페이징
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pageRangeStart, setPageRangeStart] = useState(0); // 페이지 범위 시작
  const [pageRangeEnd, setPageRangeEnd] = useState(5); // 페이지 범위 끝
  const reviewsPerPage = 4; //현재 페이지 내 보여줄 리스트 개수

  useEffect(() => {
    const groupFaq = [];
    for (let i = 0; i < FaqList.length; i += reviewsPerPage) {
      groupFaq.push(FaqList.slice(i, i + reviewsPerPage));
    }
    setGroupedFaq(groupFaq);
  }, [FaqList]);

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    if (newPageRangeStart < groupedFaq.length) {
      setPageRangeStart(newPageRangeStart);
      setPageRangeEnd(newPageRangeEnd);
      setCurrentPage(pageRangeStart + 6); // 5 페이지씩 건너뛰고 이동
    }
  };

  //현재 페이지에서 내가 출력하고자 하는 리뷰의 개수를 함수를 통해 groupedReviews[currentPage - 1] 조절 한 뒤 currentReviews에 저장
  const currentReviews = groupedFaq[currentPage - 1] || [];

  return (
    <Container class="d-flex justify-content-center">
      <div className="m-5">
        <div className=" d-flex m-5">
          <Nav.Link href="/announcements">
            <span className="nav_notice" style={{ fontSize: '33px' }}>
              공지사항
            </span>
          </Nav.Link>
          <span className="nav_notice" style={{ fontSize: '33px' }}>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </span>
          <Nav.Link href="/announcements/faq">
            <span className="nav_notice" style={{ fontSize: '33px' }}>
              FAQ
            </span>
          </Nav.Link>
        </div>
        <Container>
          <Accordion defaultActiveKey="0">
            <div
              style={{ fontFamily: 'Freesentation-9Black' }}
              className="ms-5 mb-3"
            >
              {FaqList.length}개 자주묻는 질문
            </div>
            {groupedFaq.length === 0 ? (
              <div
                className="ms-5 mb-3"
                style={{ fontFamily: 'Freesentation-9Black' }}
              >
                FAQ내용이 없습니다.
              </div>
            ) : (
              currentReviews.map((object, idx) => (
                <Accordion.Item
                  eventKey={idx}
                  flush
                  key={object.FAQ_NO}
                  className="mb-3"
                >
                  <Accordion.Header>
                    <span
                      className="faq_accordion_title"
                      style={{
                        width: '1100px',
                        height: '50px',
                      }}
                    >
                      {object.FAQ_TITLE}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <span
                      className="faq_accordion_body "
                      style={{
                        width: '1100px',
                      }}
                    >
                      {object.CONTENT}
                    </span>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            )}
          </Accordion>
        </Container>
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
            if (pageNumber <= groupedFaq.length) {
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
          {pageRangeEnd < groupedFaq.length && (
            <Pagination.Next
              onClick={handleNextPage}
              disabled={pageRangeEnd >= groupedFaq.length}
            />
          )}
        </Pagination>
      </div>
    </Container>
  );
}
