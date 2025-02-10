import React, { useState, useRef } from 'react';
import { Button, Container, Nav, Pagination } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import HorizonLine from './HorizonLine';
import './MyPage.css';

export default function MyReviews() {
  let item = [];
  for (let number = 1; number <= 5; number++) {
    item.push(
      <Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>
    );
  }
  const radioValue = useRef();
  const radioValueChecked = () => {
    radioValue.current = 'checked';
    console.log(radioValue);
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

  return (
    <>
      <Container>
        <div className="mypage_review_list mt-5 w-100">
          <div className="d-flex justify-content-start gap-3 mb-4">
            <table className="mypage_review_table">
              {completedMeetings.map((object) => (
                <tbody key={object.no}>
                  <tr>
                    <td>
                      <input type="radio" name="radio" ref={radioValue} />
                    </td>
                    <Nav.Link href="#" onClick={radioValueChecked}>
                      <tr className="d-flex m-4">
                        <td>
                          <img
                            src="/images/review1.png"
                            alt="이미지"
                            style={{ width: '120px' }}
                            className="mypage_review_table_img"
                          />
                        </td>
                        <tr className="d-flex flex-column ms-4 w-100 justify-content-center">
                          <td>
                            <span
                              style={{ fontSize: '30px', fontWeight: '900' }}
                            >
                              {object.name}
                            </span>
                          </td>
                          <tr className="d-flex justify-content-between align-items-center">
                            <td style={{ fontSize: '14px' }}>
                              <span>{object.date}~</span>
                              <span> {object.endDate}</span>
                            </td>
                            <td
                              style={{ fontSize: '17px', fontWeight: '900' }}
                              className="me-5"
                            >
                              {object.role}
                            </td>
                          </tr>
                          <td>
                            <span style={{ fontWeight: '900' }}>
                              {object.cost}
                            </span>
                          </td>
                        </tr>
                      </tr>
                    </Nav.Link>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </Container>
      <Container className="mb-5">
        <div className="d-flex justify-content-center align-content-center mb-3">
          <Pagination size="sm">{item}</Pagination>
          <Nav.Link href="/review/Regist" className="reviewList">
            <span>작성 하기</span>
          </Nav.Link>
        </div>
      </Container>
    </>
  );
}
