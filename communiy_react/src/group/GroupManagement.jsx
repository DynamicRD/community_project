import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';

export default function GroupManagement() {
  const memberList = [
    {
      id:'gasdf1',
      nickname:'nickname',
      reg_date:'2025-02-06',
    },
  ];
  return (
    <Container>
      <div className="group_management d-flex flex-column gap-4">
        <h2>모임 멤버 관리</h2>
        <div>
          <h3>승인 대기 목록</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>아이디</th>
                <th>닉네임</th>
                <th>신청 시간</th>
                <th>참가 승인</th>
              </tr>
            </thead>
            <tbody>
              {memberList.map((memberList,index) => {
                return(
                <tr key={index}>
                  <td>{memberList.id}</td>
                  <td>{memberList.nickname}</td>
                  <td>{memberList.reg_date}</td>
                  <td className="w-25">
                    <Button>승인하기</Button>&nbsp;<Button>거부하기</Button>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div>
          <h3>참여중인 멤버 목록</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>아이디</th>
                <th>닉네임</th>
                <th>직책</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>asdf</td>
                <td>닉</td>
                <td>멤버</td>
                <td>
                  <Button>추방하기</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
