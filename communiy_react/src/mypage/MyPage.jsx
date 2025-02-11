import './MyPage.css';
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Pagination,
} from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Link 임포트
import 'bootstrap/dist/css/bootstrap.min.css';

function MyPage() {
  // 상태 관리: 알림 펼침 여부
  const [showMore, setShowMore] = useState(false);
  // 모임 타입 상태 (진행중인 모임, 종료된 모임, 찜한 모임)
  const [activeTab, setActiveTab] = useState('ongoing'); // 기본값: 진행중인 모임

  // 알림 내용
  const notifications = [
    '모임1의 참가자 리뷰가 추가되었습니다!',
    '모임2의 일정이 변경되었습니다.',
    '모임3의 장소가 변경되었습니다.',
    '모임4의 참가자 목록이 업데이트되었습니다.',
    '모임5의 일정이 확정되었습니다.',
  ];

  // 모임 데이터
  const ongoingMeetings = [
    {
      name: '독서클럽',
      date: '2025-01-25',
      endDate: '2025-01-26',
      role: '모임장',
      cost: '₩ 10,000',
    },
    {
      name: '영화모임',
      date: '2025-02-01',
      endDate: '2025-02-02',
      role: '평회원',
      cost: '₩ 15,000',
    },
  ];

  const completedMeetings = [
    {
      name: '테크 세미나',
      date: '2025-01-10',
      endDate: '2025-01-10',
      role: '참석자',
      cost: '₩ 30,000',
    },
    {
      name: '사진 동아리',
      date: '2025-01-15',
      endDate: '2025-01-15',
      role: '모임장',
      cost: '₩ 20,000',
    },
  ];

  const savedMeetings = [
    {
      name: '문학 모임',
      date: '2025-02-05',
      endDate: '2025-02-06',
      role: '참석 예정',
      cost: '₩ 12,000',
    },
    {
      name: '여행 모임',
      date: '2025-02-10',
      endDate: '2025-02-11',
      role: '참석 예정',
      cost: '₩ 25,000',
    },
  ];

  // 선택된 모임 테이블 렌더링
  const renderTable = () => {
    let meetings = [];
    switch (activeTab) {
      case 'ongoing':
        meetings = ongoingMeetings;
        break;
      case 'completed':
        meetings = completedMeetings;
        break;
      case 'saved':
        meetings = savedMeetings;
        break;
      default:
        break;
    }

    return (
      <Table bordered className="mt-3">
        <thead>
          <tr className="table-success">
            <th>모임명</th>
            <th>참가일시</th>
            <th>종료일자</th>
            <th>직책</th>
            <th>비용</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting, index) => (
            <tr key={index}>
              <td>{meeting.name}</td>
              <td>{meeting.date}</td>
              <td>{meeting.endDate}</td>
              <td>{meeting.role}</td>
              <td>{meeting.cost}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Container className="mt-5 w-75">
      <div className="myPage">
        {/* Profile Header */}
        <div className="profile-header rounded-2 p-4">
          <Row>
            <Col md={2}>
              <img
                src="./img/01.jpg"
                className="rounded-circle"
                alt="Profile Picture"
                style={{
                  height: '100px',
                  border: '4px solid white',
                  padding: '5px',
                }}
              />
            </Col>
            <Col md={10}>
              <h3>ZEUS</h3>
              <p>모임사이트 웰컴 멤버</p>
            </Col>
          </Row>
          <hr />
          <div className="container bg-light text-dark p-4">
            <div className="text-end">
              <Link to="/mypage/profilechange">
                <Button variant="custom">프로필 수정하기</Button>
              </Link>
            </div>
            <div className="text-center mt-3">
              <p>자기소개가 없습니다.</p>
            </div>
          </div>
          <div className="btn-group-justified m-3">
            <Link to="/mypage/infochange">
              <Button variant="light m-3">개인 정보 수정</Button>
            </Link>
            <Link to="/mypage/amounthis">
              <Button variant="light m-3">거래 내역 확인</Button>
            </Link>
            <Link to="/mypage/reviews">
              <Button variant="light m-3">작성 리뷰 확인</Button>
            </Link>
          </div>
        </div>

        {/* Balance Section */}
        <Row className="mt-4">
          <Col md={12}>
            <div className="mainpage border-section text-center ">
              <h5>보유금액</h5>
              <div className="h3">₩ 500,000</div>
              <div className="mt-3">
                <Link to="/mypage/charge">
                  <Button>충전하기</Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        {/* Notifications */}
        <div className="border-section mt-4">
          <h5>알림</h5>
          {/* 알림 목록 */}
          <ul>
            {notifications
              .slice(0, showMore ? notifications.length : 2)
              .map((notification, index) => (
                <li key={index}>{notification}</li>
              ))}
          </ul>

          {/* 더보기 / 접기 버튼 */}
          <Button
            variant="custom"
            className="mt-3"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? '접기' : '더보기'}
          </Button>
        </div>

        {/* Meetings Section */}
        <div className="border-section mt-4">
          <div className="btn-group m-2">
            <Button
              className="m-2"
              onClick={() => setActiveTab('ongoing')}
            >
              진행중인 모임
            </Button>
            <Button
              className="m-2"
              onClick={() => setActiveTab('completed')}
            >
              종료된 모임
            </Button>
            <Button
              className="m-2"
              onClick={() => setActiveTab('saved')}
            >
              찜한 모임
            </Button>
          </div>

          {/* 해당 모임 테이블 렌더링 */}
          {renderTable()}

          <Pagination className="d-flex justify-content-center">
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
          <div className="text-center">
            {' '}
            <Link to="/mypage/infodelete">
              <Button variant="danger" block className="mt-3">
                회원탈퇴
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MyPage;
