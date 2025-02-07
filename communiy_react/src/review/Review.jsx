import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

import './Review.css';

export default function Review({ reviewData }) {
  let item = [];
  for (let number = 1; number <= 5; number++) {
    item.push(
      <Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>
    );
  }

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
                    <Nav.Link href="/review/Read">
                      <img
                        src={object.img}
                        alt="review"
                        className="review_img"
                      />
                    </Nav.Link>
                    <div className="d-flex justify-content-between align-items-center mt-3 me-4 ms-4">
                      <Nav.Link href="/review/Read">{object.title}</Nav.Link>
                      <span style={{ fontSize: '12px' }}>
                        평점: {object.rating}
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
        <div className="d-flex justify-content-center align-content-center">
          <Pagination size="sm">{item}</Pagination>
          <Nav.Link href="/review/Regist" className="reviewRegist">
            <span>작성 하기</span>
          </Nav.Link>
        </div>
      </Container>
    </>
  );
}