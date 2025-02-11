import React, { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import GroupJoinFormView from './component/GroupJoinFormView';
import { useNavigate } from 'react-router';

export default function GroupManagement() {
  let navigate = useNavigate();

  const memberList = [
    {
      id: 'gasdf1',
      nickname: 'nickname1',
      birth: '1999-01-01',
      reg_date: '2025-02-06',
      role: 'member',
      self_pr: '자기소개입니다',
      group_pr: '잘 부탁드립니다.',
      gender: '여성',
      phone: '010-1234-5678',
    },
    {
      id: 'gasdf2',
      nickname: 'nickname2',
      birth: '1999-01-01',
      reg_date: '2025-02-06',
      role: 'member',
      self_pr: '자기소개입니다',
      group_pr: '잘 부탁드립니다.',
      gender: '여성',
      phone: '010-1234-5678',
    },
    {
      id: 'gasdf3',
      nickname: 'nickname3',
      birth: '1999-01-01',
      reg_date: '2025-02-06',
      role: 'member',
      self_pr: '자기소개입니다',
      group_pr: '잘 부탁드립니다.',
      gender: '여성',
      phone: '010-1234-5678',
    },
  ];

  const [formShow, setFormShow] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const formOpen = (id) => {
    const member = memberList.find((member) => member.id === id);
    setSelectedMember(member);
    setFormShow(true);
  };
  let loading = false;
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <Container className="d-flex justify-content-center align-items-center">
        <div className="group_management d-flex flex-column gap-4 mt-5 w-75">
          <div className="d-flex justify-content-between">
            <h1>모임 멤버 관리</h1>
            <Button
              onClick={() => {
                navigate('/group/update');
              }}
            >
              모임 정보 수정
            </Button>
          </div>
          <hr />
          <div>
            <h3 className="mb-3">승인 대기 목록({memberList.length})</h3>
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
                {memberList.map((member) => {
                  return (
                    <tr
                      key={member.id}
                      onClick={() => formOpen(member.id)} // 클릭 시 정보 열기
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{member.id}</td>
                      <td>{member.nickname}</td>
                      <td>{member.reg_date}</td>
                      <td>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('승인하시겠습니까?')) {
                              fetch(
                                'http://localhost:8080/member/statusUpdate',
                                {
                                  method: 'POST',
                                }
                              );
                              alert('승인이 완료되었습니다.');
                            }
                          }}
                        >
                          승인하기
                        </Button>
                        &nbsp;
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('거부하시겠습니까?')) {
                              fetch(
                                'http://localhost:8080/member/statusUpdate',
                                {
                                  method: 'POST',
                                }
                              );
                              alert('승인이 거부되었습니다.');
                            }
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
            <h3 className="mb-3">참여중인 멤버 목록({memberList.length})</h3>
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
                {memberList.map((member) => {
                  return (
                    <tr
                      key={member.id}
                      onClick={() => formOpen(member.id)} // 클릭 시 정보 열기
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{member.id}</td>
                      <td>{member.nickname}</td>
                      <td>{member.phone}</td>
                      <td>{member.role}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <div className="m-5 d-flex justify-content-end">
              <Button variant="danger" size="lg">
                모임 종료하기
              </Button>
            </div>
          </div>
          <GroupJoinFormView
            show={formShow}
            onHide={() => setFormShow(false)}
            member={selectedMember}
          />
        </div>
      </Container>
    );
  }
}
