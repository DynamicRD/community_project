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

  return (
    <>
      <Container>
        <div className="review_board">
          <ul id="board_list" className="list-unstyled">
            <div className="d-flex mt-5">
              <div className="text1">
                <table>
                  <thead className="d-flex gap-5">
                    {reviewData.map((object) => (
                      <tr key={object.no} className="d-flex flex-column">
                        <td>
                          <li>
                            <Nav.Link href="/review/Read">
                              <img
                                src={object.img}
                                alt="review"
                                className="review_img"
                              />
                            </Nav.Link>
                          </li>
                        </td>
                        <td className="d-flex justify-content-between align-content-centner m-3">
                          <li>
                            <Nav.Link href="/review/Read">
                              {object.title}
                            </Nav.Link>
                          </li>
                          <li style={{ fontSize: '12px' }}>
                            평점: {object.rating}
                          </li>
                        </td>
                      </tr>
                    ))}
                  </thead>
                </table>
              </div>
            </div>
            <div className="d-flex justify-content-center align-content-center">
              <Pagination size="sm">{item}</Pagination>
              <Nav.Link href="/review/Regist" className="reviewRegist">
                <span>작성 하기</span>
              </Nav.Link>
            </div>
          </ul>
        </div>
      </Container>
    </>
  );
}
