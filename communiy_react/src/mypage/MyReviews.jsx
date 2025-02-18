import React, { useState, useRef, useEffect, useContext } from 'react';
import { Button, Container, Nav, Pagination } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import HorizonLine from './HorizonLine';
import './MyPage.css';
import { AuthContext } from '../context/AuthContext'; //

function useFetch(url) {
  const [loading, setLoading] = useState(false);
  const [completedMeetings, setCompletedMeetings] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCompletedMeetings(data);
      })
      .catch((error) => {
        console.error('Error fetching review data:', error);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);
  return [completedMeetings, loading];
}

export default function MyReviews() {
  const pathIdx = window.location.pathname.split('/').pop();
  const url = 'http://localhost:8080/review/group/list/' + pathIdx;

  let item = [];
  for (let number = 1; number <= 5; number++) {
    item.push(
      <Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>
    );
  }
  const [completedMeetings, loading] = useFetch(url);

  // 라디오 버튼 선택 값을 저장할 상태 변수
  const [selectedRadioValue, setSelectedRadioValue] = useState(null);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  // 라디오 버튼 클릭 시 값 변경
  const radioValueChecked = (value) => {
    setSelectedRadioValue(value);
    setCheck(true);
  };

  useEffect(() => {
    if (selectedRadioValue !== null) {
      console.log(selectedRadioValue); // 상태가 변경된 후 로그 출력
    }
  }, [selectedRadioValue]);

  //fetch로 모임 값 가져오고

  const { isAuthenticated, userData } = useContext(AuthContext);

  return (
    <>
      <Container>
        <div className=" d-flex m-5">
          <span
            className="nav_notice"
            style={{ fontSize: '33px', marginLeft: '65px' }}
          >
            모임 목록
          </span>
        </div>

        <div className="mypage_review_list mt-5 w-100">
          <div className="d-flex justify-content-start gap-3 mb-4">
            <table className="mypage_review_table">
              {completedMeetings.length > 0 ? (
                <>
                  {completedMeetings.map((object, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>
                          {/* 라디오 버튼 */}
                          <input
                            type="radio"
                            name="radio"
                            value={object.GROUP_NO}
                            checked={selectedRadioValue === object.GROUP_NO}
                            onChange={() => radioValueChecked(object.GROUP_NO)}
                          />
                        </td>
                        <td>
                          <Nav.Link
                            href="#"
                            onClick={() => radioValueChecked(object.GROUP_NO)}
                          >
                            <div className="d-flex m-4">
                              <img
                                src={`/images/${object.IMG_URL1}`}
                                alt="이미지"
                                style={{ width: '120px' }}
                                className="mypage_review_table_img"
                              />
                              <div className="d-flex flex-column ms-4 w-100 justify-content-center">
                                <span
                                  style={{
                                    fontSize: '30px',
                                    fontWeight: '900',
                                  }}
                                >
                                  {object.GROUP_TITLE}
                                </span>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span style={{ fontSize: '14px' }}>
                                    {object.START_DATE}~ {object.LAST_DATE}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: '17px',
                                      fontWeight: '900',
                                    }}
                                    className="me-5"
                                  >
                                    {object.MC_NICKNAME}
                                  </span>
                                </div>
                                <span style={{ fontWeight: '900' }}>
                                  {object.PRICE}원
                                </span>
                              </div>
                            </div>
                          </Nav.Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-center mt-5 mb-5">
                    <span
                      style={{
                        fontSize: '30px',
                        fontWeight: '900',
                      }}
                    >
                      참여한 모임이 없습니다.
                    </span>
                  </div>
                </>
              )}
            </table>
          </div>
        </div>
      </Container>
      <Container className="mb-5">
        <div className="d-flex justify-content-center align-content-center ms-5 mb-3">
          <Pagination size="sm">{item}</Pagination>
          <Nav.Link
            onClick={() => {
              if (check === true) {
                // window.location.href = `/review/Regist/${selectedRadioValue}`;
                navigate(`/review/Regist/${selectedRadioValue}`);
              } else {
                alert('모임을 선택 해 주세요');
              }
            }}
            className="reviewList"
          >
            <span>작성하기</span>
          </Nav.Link>
        </div>
      </Container>
    </>
  );
}
