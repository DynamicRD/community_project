import React, { useContext, useEffect, useRef, useState } from 'react';
import '../GroupDetail.css';
import GroupJoinForm from './GroupJoinForm';
import ChatRoom from '../../chatroom/Chatroom';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faHeart } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';

export default function GroupDetailButton({ group_no }) {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const [applicable, setApplicable] = useState();
  const [formShow, setFormShow] = useState(false);
  const [chatShow, setChatShow] = useState(false);
  const [userRole, setUserRole] = useState();
  const [start_date, SetStart_Date] = useState();
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(false);
  useEffect(() => {
    // 모집 종료 여부
    const checkIfClosed = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/group/isClosed?group_no=${group_no}`
        );
        const result = await response.json(); // 응답을 JSON으로 파싱
        setIsClosed(result); // 응답 값으로 isClosed 상태 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    checkIfClosed(); // 함수 호출


    //모임 권한 받아오기
    if (userData !== null) {
      const form = new FormData();
      form.append('no', userData.no);
      form.append('group_no', group_no);

      fetch(`http://localhost:8080/group/auth`, {
        method: 'POST',
        body: form,
      })
        .then((res) => res.text())
        .then((data) => {
          setUserRole(data);
        })
        .catch((error) =>
          console.error('Error fetching group members:', error)
        );
    }
  }, [userData, group_no, userRole]);

  const handleButtonClick = () => {
    navigate(`/group/management?group_no=${group_no}`);
  };

  // 참가 취소 처리 및 환불 정책
  const handleCancelApplication2 = () => {
    // 모임 시작일 비교
    const checkStartDate = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/group/checkStartDate?group_no=${group_no}`
        );
        const result = await response.text(); // 응답을 JSON으로 파싱
        SetStart_Date(result); // 응답 값으로 isClosed 상태 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    checkStartDate();

    const currentDate = new Date();
    const eventDate = new Date(start_date);

    // 날짜 차이 계산 (밀리초 단위로 차이 계산 후 일 수로 변환)
    const timeDiff = eventDate - currentDate;
    const daysToEvent = timeDiff / (1000 * 3600 * 24);

    // 환불 조건
    if (daysToEvent > 7) {
      if (confirm('취소하시겠습니까? 100% 환불이 진행됩니다.')) {
        const form = new FormData();
        form.append('group_no', Number(group_no));
        form.append('no', userData?.no);
        form.append('status', 'MEMBER');
        fetch('http://localhost:8080/group/cancelJoin', {
          method: 'POST',
          body: form,
        })
          .then((response) => {
            if (!response.ok) {
              return response.text().then((errorData) => {
                try {
                  const parsedError = JSON.parse(errorData);
                  throw new Error(
                    parsedError.message ||
                      '처리에 실패했습니다. 다시 시도해주세요.'
                  );
                } catch (e) {
                  throw new Error(
                    errorData || '처리에 실패했습니다. 다시 시도해주세요.'
                  );
                }
              });
            }
            return response.text();
          })
          .then((message) => {
            alert(message);
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    } else if (daysToEvent <= 3) {
      alert('모임 시작일 3일전입니다. 취소할 수 없습니다.');
    }
  };

  const handleCancelApplication = () => {
    if (confirm('취소하시겠습니까? 100% 환불이 진행됩니다.')) {
      const form = new FormData();
      form.append('group_no', Number(group_no));
      form.append('no', userData?.no);
      form.append('start_date', start_date);
      fetch('http://localhost:8080/group/cancelJoin', {
        method: 'POST',
        body: form,
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((errorData) => {
              try {
                const parsedError = JSON.parse(errorData);
                throw new Error(
                  parsedError.message ||
                    '처리에 실패했습니다. 다시 시도해주세요.'
                );
              } catch (e) {
                throw new Error(
                  errorData || '처리에 실패했습니다. 다시 시도해주세요.'
                );
              }
            });
          }
          return response.text();
        })
        .then((message) => {
          alert(message);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="group_detail">
      <div className="button">
        {/* 비회원 또는 대기 상태일 때 */}
        {!(userRole === 'MEMBER' || userRole === 'LEADER') && (
          <>
            {isClosed ? (
              <button
                className="nonApplicable"
                onClick={() => {
                  alert('모집이 마감된 모임입니다.');
                }}
              >
                모집이 마감된 모임입니다.
              </button>
            ) : (
              <>
                {userRole === 'WAITING' ? (
                  <button onClick={handleCancelApplication}>
                    참가 신청 취소하기
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        if (!isAuthenticated) {
                          alert('로그인 후 이용해주세요');
                          return;
                        }

                        const form = new FormData();
                        form.append('group_no', Number(group_no));
                        form.append('no', userData?.no);

                        fetch('http://localhost:8080/group/basket', {
                          method: 'POST',
                          body: form,
                        })
                          .then((response) => {
                            if (!response.ok) {
                              return response.text().then((errorData) => {
                                try {
                                  const parsedError = JSON.parse(errorData);
                                  throw new Error(
                                    parsedError.message ||
                                      '처리에 실패했습니다. 다시 시도해주세요.'
                                  );
                                } catch (e) {
                                  throw new Error(
                                    errorData ||
                                      '처리에 실패했습니다. 다시 시도해주세요.'
                                  );
                                }
                              });
                            }
                            return response.text();
                          })
                          .then((message) => {
                            alert(message);
                          })
                          .catch((error) => {
                            alert(error.message);
                          });
                      }}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      &nbsp;찜하기
                    </button>
                    <button
                      onClick={() => {
                        if (!isAuthenticated) {
                          alert('로그인 후 이용해주세요');
                          return;
                        }
                        setFormShow(true);
                      }}
                    >
                      참가 신청하기
                    </button>
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* 모임멤버 권한일 때 */}
        {userRole === 'MEMBER' && (
          <>
            <button onClick={() => setChatShow(true)}>
              <FontAwesomeIcon icon={faComments} />
              &nbsp;모임 채팅 참여하기
            </button>
            <button
              onClick={handleCancelApplication2}
              className="nonApplicable"
            >
              참가 신청 취소하기
            </button>
          </>
        )}

        {/* 모임장 권한일 때 */}
        {userRole === 'LEADER' && (
          <>
            <button onClick={() => setChatShow(true)}>
              <FontAwesomeIcon icon={faComments} />
              &nbsp;모임 채팅 참여하기
            </button>
            <button onClick={handleButtonClick}>&nbsp;모임 관리하기</button>
          </>
        )}
      </div>

      <GroupJoinForm
        show={formShow}
        onHide={() => setFormShow(false)}
        group_no={group_no}
      />
      <ChatRoom
        show={chatShow}
        onHide={() => setChatShow(false)}
        group_no={group_no}
      />
    </div>
  );
}
