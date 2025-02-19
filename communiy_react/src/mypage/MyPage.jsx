import './MyPage.css';
import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Pagination,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Link 임포트
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../context/AuthContext'; //
import axios from 'axios';

function MyPage() {
  const [meetings, setMeetings] = useState([]); // 모임 데이터 상태
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState('ongoing'); // 기본값:
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const { isAuthenticated, userData } = useContext(AuthContext);
  useEffect(() => {
    console.log('userData 대기중');
    if (!userData) return; // userData가 로드될 때까지 기다림

    if (isAuthenticated !== false) {
      const pathSegments = window.location.pathname.split('/');
      const pageId = pathSegments[pathSegments.length - 1];
      if (userData?.no.toString() !== pageId) {
        alert('접근 권한이 없습니다.');
        navigate('/');
      }
    }
  }, [isAuthenticated, userData, navigate]);

  // 페이지네이션을 위한 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 한 페이지당 3개씩 표시

  // 현재 페이지에 맞는 데이터 필터링
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeetings = meetings.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination UI 렌더링
  <Pagination className="d-flex justify-content-center">
    <Pagination.Prev
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    />
    {[...Array(totalPages)].map((_, index) => (
      <Pagination.Item
        key={index + 1}
        active={index + 1 === currentPage}
        onClick={() => handlePageChange(index + 1)}
      >
        {index + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    />
  </Pagination>;

  // 알림 내용
  useEffect(() => {
    if (!userData) return;

    axios
      .get(`http://localhost:8080/mypage/notification/${userData?.no}`)
      .then((response) => {
        console.log('알림 데이터:', response.data);
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('알림 데이터 로드 실패:', error);
      });
  }, [userData]);

  useEffect(() => {
    if (!userData) return;

    axios
      .get(`http://localhost:8080/mypage/group/${userData?.no}`)
      .then((response) => {
        console.log('모임 데이터:', response.data);
        setMeetings(response.data);
      })
      .catch((error) => {
        console.error('모임 데이터 로드 실패:', error);
      });
  }, [userData]);
  const endedGroups = meetings?.[0] || []; // 종료된 그룹
  const heartedGroups = meetings?.[1] || []; // 찜한 그룹
  const ongoingGroups = meetings?.[2] || []; // 진행 중인 그룹

  useEffect(() => {
    if (notifications.length > 0) {
      const unread = notifications.filter(
        (notification) => notification.isRead === 'N'
      ).length;
      setUnreadCount(unread);
    }
  }, [notifications]);

  const renderTable = () => {
    let meetings = [];
    switch (activeTab) {
      case 'ongoing':
        meetings = ongoingGroups;

        break;
      case 'completed':
        meetings = endedGroups;

        break;
      case 'saved':
        meetings = heartedGroups;

        break;
      default:
        break;
    }

    return (
      <Table bordered className="mt-3">
        <thead>
          <tr className="table-secondary">
            <th>모임명</th>
            <th>참가일시</th>
            <th>종료일자</th>
            <th>직책</th>
            <th>비용</th>
          </tr>
        </thead>
        <tbody>
          {meetings == [] ? (
            meetings.map((meeting, index) => (
              <tr key={index}>
                <td>{meeting.groupName}</td>
                <td>{meeting.startDate}</td>
                <td>{meeting.endDate}</td>
                <td>{meeting.statues}</td>
                <td>{meeting.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>해당 내역이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(value);
  };
  return (
    <Container className="mt-5 w-75">
      <div className="myPage">
        {/* Profile Header */}
        <div className="profile-header rounded-2 p-4">
          <Row>
            <Col md={2}>
              <img
                src={`D:/community_project/communiy_react/public/images/${userData?.imgUrl}`}
                className="rounded-circle"
                alt="Profile Picture"
                style={{
                  height: '100px',
                  border: '4px solid white',
                  padding: '5px',
                  width: '100px',
                }}
              />
            </Col>
            <Col md={10}>
              <h3>{userData?.name}</h3>
              <p>모임사이트 웰컴 멤버</p>
            </Col>
          </Row>
          <hr />
          <div className="container bg-light text-dark p-4">
            <div className="text-end">
              <Link to={`/mypage/profilechange/${userData?.no}`}>
                <Button className="myPageBtn" variant="danger">
                  프로필 수정하기
                </Button>
              </Link>
            </div>

            <div className="text-center mt-3">
              {userData?.selfPr ? (
                <p>{userData?.selfPr}</p>
              ) : (
                <p>자기소개가 없습니다.</p>
              )}
            </div>
          </div>
          <div className="btn-group-justified m-3">
            <Link to={`/mypage/infochange/${userData?.no}`}>
              <Button
                variant="light m-3"
                style={{ border: '1px solid rgba(255, 47, 0, 0.65)' }}
              >
                개인 정보 수정
              </Button>
            </Link>
            <Link to={`/mypage/amounthis/${userData?.no}`}>
              <Button
                variant="light m-3"
                style={{ border: '1px solid rgba(255, 47, 0, 0.65)' }}
              >
                거래 내역 확인
              </Button>
            </Link>
            <Link to={`/mypage/reviews/${userData?.no}`}>
              <Button
                variant="light m-3"
                style={{ border: '1px solid rgba(255, 47, 0, 0.65)' }}
              >
                작성 리뷰 확인
              </Button>
            </Link>
          </div>
        </div>

        {/* Balance Section */}
        <Row className="mt-4">
          <Col md={12}>
            <div className="mainpage border-section text-center ">
              <h5>보유금액</h5>
              <div className="h3">
                {userData && userData?.money
                  ? formatCurrency(userData?.money)
                  : '₩ 0'}
              </div>
              <div className="mt-3">
                <Link to={`/mypage/charge/${userData?.no}`}>
                  <Button className="myPageBtn" variant="danger">
                    충전하기
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        {/* Notifications */}
        <div className="border-section mt-4">
          <h5>알림</h5>
          <br />
          <h6>{unreadCount}개의 읽지 않은 알림이 있습니다.</h6>
          <ul>
            {notifications.length > 0 ? (
              notifications
                .slice(0, showMore ? notifications.length : 3)
                .map((notification, index) => (
                  <li key={index}>{notification.content}</li>
                ))
            ) : (
              <li>알림이 없습니다.</li>
            )}
          </ul>

          <Button
            className="myPageBtn mt-3"
            variant="danger"
            onClick={() => {
              setShowMore(!showMore);

              // 백엔드에 userData.no 값 보내기
              if (userData?.no) {
                axios
                  .post('http://localhost:8080/mypage/showMore', {
                    no: userData.no,
                  })
                  .then((response) => {
                    console.log('서버 응답:', response.data);
                  })
                  .catch((error) => {
                    console.error('서버 요청 실패:', error);
                  });
              }
            }}
          >
            {showMore ? '접기' : '더보기'}
          </Button>
        </div>

        {/* Meetings Section */}
        <div className="border-section mt-4">
          <div className="btn-group m-2">
            <Button
              className="typeClub m-2"
              variant="light"
              style={{
                borderRadius: '5px',
                color: 'white',
              }}
              onClick={() => setActiveTab('ongoing')}
            >
              진행중인 모임
            </Button>
            <Button
              className="typeClub m-2"
              variant="light"
              style={{
                borderRadius: '5px',
                color: 'white',
              }}
              onClick={() => setActiveTab('completed')}
            >
              종료된 모임
            </Button>
            <Button
              className="typeClub m-2"
              variant="light"
              style={{
                borderRadius: '5px',
                color: 'white',
              }}
              onClick={() => setActiveTab('saved')}
            >
              찜한 모임
            </Button>
          </div>

          {/* 해당 모임 테이블 렌더링 */}
          {renderTable()}

          <Pagination className="d-flex justify-content-center ">
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
          <div className="text-center">
            {' '}
            <Link to={`/mypage/withdrawal/${userData?.no}`}>
              <Button block className="myPageBtn mt-3" variant="danger">
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
