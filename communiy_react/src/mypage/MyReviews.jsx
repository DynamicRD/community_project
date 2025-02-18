import React, { useState, useRef, useEffect, useContext } from 'react';
import { Button, Container, Nav, Pagination } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import HorizonLine from './HorizonLine';
import './MyPage.css';
import { AuthContext } from '../context/AuthContext'; //

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

  const { isAuthenticated, userData } = useContext(AuthContext);
  const [groupedReviews, setGroupedReviews] = useState([]);

  // 리뷰값 DB에서 가져오기
  const [completedMeetings, setCompletedMeetings] = useState([]);
  function getList(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCompletedMeetings(data);
        console.log(data);
      });
  }

  // 페이지 시작 시 getList 호출
  useEffect(() => {
    getList('http://localhost:8080/review/group/list');
  }, []);

  return (
    <>
      <Container>
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
                        value={object.GROUP_NO} // 각 라디오 버튼에 고유한 value를 설정
                        checked={selectedRadioValue === object.GROUP_NO} // 선택된 값과 일치하면 체크
                        onChange={() => radioValueChecked(object.GROUP_NO)} // 클릭 시 값 업데이트
                      />
                    </td>
                    <Nav.Link
                      href="#"
                      onClick={() => radioValueChecked(object.GROUP_NO)}
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
                              {object.GROUP_TITLE}
                            </span>
                          </td>
                          <div className="d-flex justify-content-between align-items-center">
                            <td style={{ fontSize: '14px' }}>
                              <span>{object.START_DATE}~</span>
                              <span> {object.LAST_DATE}</span>
                            </td>
                            <td
                              style={{ fontSize: '17px', fontWeight: '900' }}
                              className="me-5"
                            >
                              {userData?.nickname}
                            </td>
                          </div>
                          <td>
                            <span style={{ fontWeight: '900' }}>
                              {object.PRICE}원
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
          <Nav.Link
            href={`/review/Regist/${selectedRadioValue}`}
            className="reviewList"
          >
            <span>작성 하기</span>
          </Nav.Link>
        </div>
      </Container>
    </>
  );
}
