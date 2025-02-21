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
import CheckAccessPermission from '../hooks/checkAccessPermission';

function MyPage() {
  const [showMore, setShowMore] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('member');
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 한 페이지당 3개 표시
  const { isAuthenticated, userData } = useContext(AuthContext);
  CheckAccessPermission(isAuthenticated, userData, navigate);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGroups(selectedCategory);
    }, 200);
    return () => clearTimeout(timer);
  }, [isAuthenticated, userData, navigate]);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(groups.length / itemsPerPage);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (userData?.no) {
      console.log('fetchGroups 실행:', selectedCategory, userData.no);
      fetchGroups(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchGroups = async (category) => {
    if (!userData?.no) return; // userData가 없으면 실행하지 않음

    try {
      const response = await axios.get(
        `http://localhost:8080/mypage/mineselect?category=${category}&no=${userData.no}`
      );
      console.log('받아온 groups 데이터:', response.data);
      setGroups(response.data); // 상태 업데이트
    } catch (error) {
      console.error('데이터를 불러오는 중 오류 발생:', error);
      setGroups([]); // 에러 발생 시 빈 배열로 설정
    }
  };

  // groups 변경 사항을 감지하여 로그 출력
  useEffect(() => {
    console.log('모임 데이터 업데이트:', groups);
  }, [groups]);

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
    console.log(userData.imgUrl);
  }, [userData]);

  //모임 데이터 받아옴
  useEffect(() => {
    if (!userData) return;

    axios
      .get(`http://localhost:8080/mypage/group/${userData?.no}`)
      .then((response) => {
        console.log('모임 데이터:', response.data);
        setGroups(response.data);
      })
      .catch((error) => {
        console.error('모임 데이터 로드 실패:', error);
      });
  }, [userData]);

  useEffect(() => {
    if (notifications.length > 0) {
      const unread = notifications.filter(
        (notification) => notification.isRead === 'N'
      ).length;
      setUnreadCount(unread);
    }
  }, [notifications]);

  const renderTable = () => {
    return (
      <Table
        bordered
        className="mt-3"
        style={{ width: '100%', tableLayout: 'fixed' }}
      >
        <thead
          className="table-secondary"
          style={{ textAlign: 'center', verticalAlign: 'middle' }}
        >
          <tr>
            <th style={{ width: '40%' }}>모임명</th>
            <th style={{ width: '15%' }}>시작일시</th>
            <th style={{ width: '15%' }}>종료일시</th>
            <th style={{ width: '15%' }}>상태</th>
            <th style={{ width: '15%' }}>비용</th>
          </tr>
        </thead>
        <tbody>
          {groups.length > 0 ? (
            groups.map((group, index) => (
              <tr
                key={index}
                style={{ textAlign: 'center', verticalAlign: 'middle' }}
              >
                <td>
                  <Link
                    to={`/group/${group.no}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {group.groupTitle}
                  </Link>
                </td>
                <td>{group.startDate}</td>
                <td>{group.lastDate}</td>
                <td>{group.status}</td>
                <td>{formatCurrency(group.price)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>
                해당 내역이 없습니다.
              </td>
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
                src={`http://localhost:8080/upload/${userData?.imgUrl}`}
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
              onClick={() => setSelectedCategory('member')}
            >
              멤버인 모임
            </Button>
            <Button
              className="typeClub m-2"
              variant="light"
              style={{
                borderRadius: '5px',
                color: 'white',
              }}
              onClick={() => setSelectedCategory('leader')}
            >
              모임장인 모임
            </Button>
            <Button
              className="typeClub m-2"
              variant="light"
              style={{
                borderRadius: '5px',
                color: 'white',
              }}
              onClick={() => setSelectedCategory('completed')}
            >
              종료된 모임
            </Button>
          </div>

          {/* 해당 모임 테이블 렌더링 */}
          {renderTable()}

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
