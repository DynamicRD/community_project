import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
        <div className="review_board mt-5">
          <ul id="board_list" className="list-unstyled">
            {groupedReviews.map((group, index) => (
              <div
                className="d-flex justify-content-start gap-3 mb-4"
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
                    <div className="d-flex justify-content-between align-items-center mt-2">
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
      <Container className="mb-5">
        <div className="d-flex justify-content-center align-items-center">
          <Pagination size="sm">{item}</Pagination>
          <Nav.Link href="/review/Regist" className="reviewRegist">
            <span>작성 하기</span>
          </Nav.Link>
        </div>
      </Container>
    </>
  );
}
