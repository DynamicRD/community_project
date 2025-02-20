import React, { useContext, useEffect, useState } from 'react';
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

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/group/countGroupMember?group_no=${group_no}`)
      .then((res) => res.json())
      .then((data) => {
        setApplicable(data.MEMBER_COUNT < data.USER_MAX);
      })
      .catch((error) =>
        console.error('Error fetching countGroupMember:', error)
      );

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
  }, [userData, group_no]);

  const handleButtonClick = () => {
    navigate(`/group/management?group_no=${group_no}`);
  };

  return (
    <div className="group_detail">
      <div className="button">
        {applicable === false ? (
          <button className='nonApplicable'
            onClick={() => {
              alert('모임이 이미 가득 찼습니다. 나중에 다시 시도해 주세요.');
            }}
          >
            모집이 종료된 모임입니다.
          </button>
        ) : (
          <>
            {/* 회원권한, 모임장권한이 아닐때 (비회원 또는 대기 상태) */}
            {!(userRole === 'MEMBER' || userRole === 'LEADER') && (
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

            {/* 모임멤버 권한일 때 */}
            {userRole === 'MEMBER' && (
              <button onClick={() => setChatShow(true)}>
                <FontAwesomeIcon icon={faComments} />
                &nbsp;모임 채팅 참여하기
              </button>
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
