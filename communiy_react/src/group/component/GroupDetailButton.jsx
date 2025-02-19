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

  //신청폼 띄우기
  const [formShow, setFormShow] = useState(false);

  // 채팅창 띄우기
  const [chatShow, setChatShow] = useState(false);

  //권한별 버튼 설정
  const navigate = useNavigate();
  useEffect(() => {
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
          // if(data===null){
          //   return;
          // }
          setUserRole(data);
          console.log(userRole);
        })
        .catch((error) => console.error('Error fetching group members:', error));
    }
  }, [userData, group_no]); 

  const [userRole, setUserRole] = useState(null);
  
  const handleButtonClick = () => {
    navigate(`/group/management?group_no=${group_no}`);
  };

  return (
    <div className="group_detail">
      {/* 권한별 버튼 */}
      <div className="button">
        {/* 비회원 권한일 때 */}
        {(!userRole || userRole === 'WAITING') && (
          <>
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  alert('로그인 후 이용해주세요');
                  return; // 인증되지 않았으면 fetch 요청을 보내지 않음
                }

                const form = new FormData();
                form.append('group_no', Number(group_no));
                form.append('no', userData?.no); // 회원 아이디

                // fetch 요청 보내기
                fetch('http://localhost:8080/group/basket', {
                  method: 'POST',
                  body: form, // FormData를 POST 요청의 body로 전송
                })
                  .then((response) => {
                    if (!response.ok) {
                      // 응답이 실패하면 JSON 형식으로 오류 메시지를 받음
                      return response.text().then((errorData) => {
                        try {
                          // 서버에서 문자열로 받은 응답을 JSON으로 파싱 시도
                          const parsedError = JSON.parse(errorData);
                          throw new Error(
                            parsedError.message ||
                              '처리에 실패했습니다. 다시 시도해주세요.'
                          );
                        } catch (e) {
                          // JSON 파싱 실패 시 그냥 문자열로 처리
                          throw new Error(
                            errorData ||
                              '처리에 실패했습니다. 다시 시도해주세요.'
                          );
                        }
                      });
                    }
                    return response.text(); // 정상 응답일 경우
                  })
                  .then((message) => {
                    alert(message); // 성공 시 반환된 메시지
                  })
                  .catch((error) => {
                    alert(error.message); // 서버에서 넘긴 오류 메시지
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
