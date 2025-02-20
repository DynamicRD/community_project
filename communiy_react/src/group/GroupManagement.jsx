import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import GroupJoinFormView from './component/GroupJoinFormView';
import { useNavigate } from 'react-router';

export default function GroupManagement() {
  const navigate = useNavigate();
  
  // URL에서 쿼리 파라미터를 파싱
  const queryParams = new URLSearchParams(location.search);
  const group_no = queryParams.get('group_no'); // 'g_id' 파라미터 값을 가져옴
  const [items, setMemberList] = useState([]);
  const [waitingMembers, setWaitingMembers] = useState([]);
  const [activeMembers, setActiveMembers] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 01부터 시작하는 월
    const day = String(date.getDate()).padStart(2, '0'); // 01부터 시작하는 날짜
    return `${year}년 ${month}월 ${day}일`;
  };

  // 멤버 목록 가져오기
  useEffect(() => {
    fetch(`http://localhost:8080/group/memberList?group_no=${group_no}`)
      .then((res) => res.json())
      .then((data) => {
        // 승인 대기 목록
        const waitingMembers = data.filter((member) => member.STATUS === 'WAITING');
        // 참여 중인 멤버 목록
        const activeMembers = data.filter((member) => member.STATUS === 'MEMBER');

        // 상태 설정
        setMemberList(data);
        setWaitingMembers(waitingMembers);
        setActiveMembers(activeMembers);
      }).catch((error) => console.error('Error fetching group members:', error));
  }, [group_no, items ]);

  // 멤버 프로필 띄우기
  const [formShow, setFormShow] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const formOpen = (id) => {
    const member = items.find((member) => member.NO === id);
    setSelectedMember(member);
    setFormShow(true);
  };

  // 멤버 승인 처리
  const handleStatusChange = (status, memberNo) => {
    const message = status === 'MEMBER' ? '승인하시겠습니까?' : '거부하시겠습니까?';
    const successMessage = status === 'MEMBER' ? '승인이 완료되었습니다.' : '승인이 거부되었습니다.';

    if (confirm(message)) {
      const formData = new FormData();
      formData.append('no', Number(memberNo));
      formData.append('status', status);  // 'MEMBER' 또는 'REJECT' 전달
      formData.append('group_no', Number(group_no));
    
      fetch('http://localhost:8080/group/statusUpdate', {
        method: 'POST',
        body: formData,  // FormData 객체를 전송
      })
      .then((response) => {
        if (response.ok) {
          alert(successMessage);
          // 필요한 후속 처리(예: 상태 업데이트 등)
        } else {
          alert('처리 중 오류가 발생했습니다.');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        alert('서버와의 연결에 문제가 있습니다.');
      });
    }
    }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="group_management d-flex flex-column gap-4 mt-5 w-75">
        <div className="d-flex justify-content-between">
          <p className='group_span'>모임 멤버 관리</p>
          <Button
            onClick={() => {
              navigate(`/group/update?group_no=${group_no}`);
            }}
          >
            모임 정보 수정
          </Button>
        </div>
        <hr />
        <div>
          <h3 className="mb-3">승인 대기 목록({waitingMembers.length})</h3>
          <Table bordered hover className="text-center">
            <thead>
              <tr>
                <th className="w-25">ID</th>
                <th className="w-25">닉네임</th>
                <th className="w-25">신청일</th>
                <th className="w-25">승인 처리</th>
              </tr>
            </thead>
            <tbody>
              {waitingMembers.map((item) => {
                return (
                  <tr
                    key={item.NO}
                    onClick={() => formOpen(item.NO)} // 클릭 시 정보 열기
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{item.NO}</td>
                    <td>{item.NICKNAME}</td>
                    <td>{formatDate(item.REG_DATE)}</td>
                    <td>
                      <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange('MEMBER', item.NO);
                      }}
                      >
                        승인하기
                      </Button>
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange('REJECT', item.NO);
                        }}
                      >
                        거부하기
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <div>
          <h3 className="mb-3">참여중인 멤버 목록({activeMembers.length})</h3>
          <Table bordered hover className="text-center">
            <thead>
              <tr>
                <th className="w-25">ID</th>
                <th className="w-25">닉네임</th>
                <th className="w-25">연락처</th>
                <th className="w-25">직책</th>
              </tr>
            </thead>
            <tbody>
              {activeMembers.map((member) => {
                return (
                  <tr
                    key={member.NO}
                    onClick={() => formOpen(member.NO)} // 클릭 시 정보 열기
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{member.NO}</td>
                    <td>{member.NICKNAME}</td>
                    <td>{member.PHONE}</td>
                    <td>{member.STATUS}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div className="m-5 d-flex justify-content-end">
            {/* <Button variant="danger" size="lg">
              모임 종료하기
            </Button> */}
          </div>
        </div>
        <GroupJoinFormView
          show={formShow}
          onHide={() => setFormShow(false)}
          selectedMember={selectedMember}
        />
      </div>
    </Container>
  );
}
