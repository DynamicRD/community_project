import React, { useState, useRef, useEffect } from 'react';
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

  // 라디오 버튼 선택 값을 저장할 상태 변수
  const [selectedRadioValue, setSelectedRadioValue] = useState(null);

  // 라디오 버튼 클릭 시 값 변경
  const radioValueChecked = (value) => {
    setSelectedRadioValue(value);
  };

  useEffect(() => {
    if (selectedRadioValue !== null) {
      console.log(selectedRadioValue); // 상태가 변경된 후 로그 출력
    }
  }, [selectedRadioValue]);

  //fetch로 모임 값 가져오고

  const completedMeetings = [
    {
      no: 1,
      name: '테크 세미나',
      date: '2025-01-10',
      endDate: '2025-01-10',
      role: '참석자',
      cost: '₩ 30,000',
    },
    {
      no: 2,
      name: '사진 동아리',
      date: '2025-01-15',
      endDate: '2025-01-15',
      role: '모임장',
      cost: '₩ 20,000',
    },
    {
      no: 3,
      name: '사진 동아리',
      date: '2025-01-15',
      endDate: '2025-01-15',
      role: '모임장',
      cost: '₩ 20,000',
    },
    {
      no: 4,
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
        <input type="radio" name="radio" />
        <input type="radio" name="radio" />
        <input type="radio" name="radio" />

        <div className="mypage_review_list mt-5 w-100">
          <div className="d-flex justify-content-start gap-3 mb-4">
            <table className="mypage_review_table">
              {completedMeetings.map((object, index) => (
                <tbody key={index}>
                  <tr>
                    <td>
                      {/* 라디오 버튼 */}
                      <input
                        type="radio"
                        name="radio"
                        value={object.no} // 각 라디오 버튼에 고유한 value를 설정
                        checked={selectedRadioValue === object.no} // 선택된 값과 일치하면 체크
                        onChange={() => radioValueChecked(object.no)} // 클릭 시 값 업데이트
                      />
                    </td>
                    <Nav.Link
                      href="#"
                      onClick={() => radioValueChecked(object.no)}
                    >
                      <div className="d-flex m-4">
                        <td>
                          <img
                            src="/images/review1.png"
                            alt="이미지"
                            style={{ width: '120px' }}
                            className="mypage_review_table_img"
                          />
                        </td>
                        <div className="d-flex flex-column ms-4 w-100 justify-content-center">
                          <td>
                            <span
                              style={{ fontSize: '30px', fontWeight: '900' }}
                            >
                              {object.name}
                            </span>
                          </td>
                          <div className="d-flex justify-content-between align-items-center">
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
                          </div>
                          <td>
                            <span style={{ fontWeight: '900' }}>
                              {object.cost}
                            </span>
                          </td>
                        </div>
                      </div>
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
