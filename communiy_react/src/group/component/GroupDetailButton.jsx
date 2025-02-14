import React, { useState } from 'react';
import '../GroupDetail.css';
import GroupJoinForm from './GroupJoinForm';
import ChatRoom from '../../chatroom/Chatroom';
import MemberProfileView from './MemberProfileView';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function GroupDetailButton({g_id}) {
//신청폼 띄우기
const [formShow, setFormShow] = useState(false);

// 채팅창 띄우기
const [chatShow, setChatShow] = useState(false);

//권한별 버튼 설정
const navigate = useNavigate();
const [userRole, setUserRole] = useState('group_leader');
const handleButtonClick = () => {
  navigate(`/group/management?g_id=${g_id}`);
};


  return (
    <div className="group_detail">
      {/* 권한별 버튼 */}
      <div className="button">
        {/* 비회원 권한일 때 */}
        {userRole === 'member' && (
          <>
            <button
              // onClick={() => {
              //   fetch('http://localhost:8080/member/statusUpdate', {
              //     method: 'post',
              //     body: Form,
              //   });
              // }}
            >
              <FontAwesomeIcon icon={faHeart} />
              &nbsp;찜하기
            </button>
            <button
              onClick={() => {
                setFormShow(true);
              }}
              // onClick={() => {
              //   <GroupJoinForm/>
              //   // fetch('http://localhost:8080/member/statusUpdate', {
              //   //   method: 'post',
              //   //   body: Form,
              //   // });
              // }}
            >
              참가 신청하기
            </button>
          </>
        )}

        {/* 모임멤버 권한일 때 */}
        {userRole === 'group_member' && (
          <button onClick={() => setChatShow(true)}>
            <FontAwesomeIcon icon={faComments} />
            &nbsp;모임 채팅 참여하기
          </button>
        )}

        {/* 모임장 권한일 때 */}
        {userRole === 'group_leader' && (
          <>
            <button onClick={() => setChatShow(true)}>
              <FontAwesomeIcon icon={faComments} />
              &nbsp;모임 채팅 참여하기
            </button>
            <button onClick={handleButtonClick}>&nbsp;모임 관리하기</button>
          </>
        )}
      </div>
      <GroupJoinForm show={formShow} onHide={() => setFormShow(false)} />
      <ChatRoom show={chatShow} onHide={() => setChatShow(false)} />
      
    </div>
  );
}
