import { Container, Form, Modal, Nav } from 'react-bootstrap';
import './GroupDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faComments,
  faHeart,
  faList,
  faLocationDot,
  faSackDollar,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import GoogleMap from './component/GoogleMap';

import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import ChatRoom from '../chatroom/Chatroom';
<style>
  .group_detail( box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px; border-radius:
  10px; padding: 50px 30px; )
</style>;
const reviewData = [
  {
    no: 1,
    title: '안녕하세요',
    writer: '문정배',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...',
    rating: 0,
    tag: 'culture',
  },
  {
    no: 2,
    title: '안녕하세요2',
    writer: '문정배2',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...',
    rating: 1,
    tag: 'culture2',
  },
  {
    no: 3,
    title: '안녕하세요3',
    writer: '문정배3',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...',
    rating: 2,
    tag: 'culture3',
  },
  {
    no: 4,
    title: '안녕하세요4',
    writer: '문정배4',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...4',
    rating: 3,
    tag: 'culture4',
  },
  {
    no: 5,
    title: '안녕하세요5',
    writer: '문정배5',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...5',
    rating: 4,
    tag: 'culture5',
  },
  {
    no: 6,
    title: '안녕하세요13',
    writer: '문정배6',
    img: '/images/review1.png',
    content:
      '내향적이고 조용히 고집스럽던 저의 일상에 너무나 따닷하고 긍정적인 변화를 준 멋진 모임입니다. 여러 플랫폼의...6',
    rating: 5,
    tag: 'culture6',
  },
];

function GroupDetail({ reviewData }) {
  //리뷰 받아오기
  const groupedReviews = [];
  for (let i = 0; i < reviewData.length; i += 3) {
    groupedReviews.push(reviewData.slice(i, i + 3));
  }

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
    {
      name: '사진 동아리',
      date: '2025-01-15',
      endDate: '2025-01-15',
      role: '모임장',
      cost: '₩ 20,000',
    },
    {
      name: '사진 동아리',
      date: '2025-01-15',
      endDate: '2025-01-15',
      role: '모임장',
      cost: '₩ 20,000',
    },
  ];

  // 채팅창 띄우기
  const [modalShow, setModalShow] = useState(false);


  // link 테스트
  const type = 'regular';

  //권한별 버튼 설정
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('group_leader');
  const handleButtonClick = () => {
    navigate('/group/management');
  }

  return (
    <Container>
      <div className="group_detail">
        <div className="information col">
          <div>
            <Link to={`/group/${type}_list`}>
              <h4>{type === 'regular' ? `정기모임>` : '동행ㆍ소모임>'}</h4>
            </Link>
            <img
              className="img-fluid"
              src="/images/group_image1.jpg"
              alt="모임 이미지"
            />
          </div>
          <div className="information_detail">
            &nbsp;
            <div>
              <p>
                <FontAwesomeIcon icon={faList} />
                &nbsp;카테고리
              </p>
              <span
                className="group_span"
                style={{ fontSize: '35px', padding: '10px 0px' }}
              >
                역삼역 일요일 아침 북클럽 모집
              </span>
            </div>
            <div>
              <h4>
                <FontAwesomeIcon icon={faCalendar} />
                &nbsp; 시작일 : 2/16 일요일 10:00
              </h4>
              <h4>
                <FontAwesomeIcon icon={faCalendar} />
                &nbsp;&nbsp; 종료일 : 2/16 일요일 10:00
              </h4>
              <h4>
                <FontAwesomeIcon icon={faUserGroup} />
                &nbsp; 모집 인원 1 / 5명
              </h4>
              <h4>
                <FontAwesomeIcon icon={faSackDollar} />
                &nbsp; 참가비 10000원
              </h4>
            </div>
          </div>
          <hr />
        </div>
        <div className="group_leader">
          <div>
            <p
              className="group_span"
              style={{ fontSize: '33px', marginBottom: '0px' }}
            >
              🌟 역삼역 일요일 아침 북클럽 모임장 한마디 🌟
            </p>
            <br></br>
            안녕하세요, 역삼역 일요일 아침 북클럽에 오신 여러분을 환영합니다! 📚
            <br></br>
            <br></br>
            새로운 시각을 얻고 싶은 분이라면 누구든지 환영입니다. 부담 없이
            오셔서 즐겁고 의미 있는 시간을 보내요! 😊<br></br>
            일요일 아침, 역삼역에서 여러분을 기다리고 있겠습니다. 함께 책 속으로
            떠나보아요! 📖✨
          </div>
          <div className="profile mt-5">
            <div className="d-flex align-items-center">
              <img
                src="/images/group_leader_profile.jpeg"
                alt="모임장 프로필"
                className="rounded-circle"
              />
              <h3 className="p-">(모임장 닉네임) 모임장</h3>
            </div>
            <h4>평균별점 5.0</h4>
          </div>
        </div>

        <div className="intro">
          <hr />
          <br />
          <p
            className="group_span"
            style={{ fontSize: '37px', marginBottom: '10px' }}
          >
            우리 모임은요
          </p>
          <p>
            📚 역삼역 일요일 아침 북클럽 모집!🌞 책과 함께 여유로운 일요일
            아침을 보내고 싶으신가요? 이번에 역삼역 근처에서 일요일 아침, 책을
            좋아하는 사람들과 함께 만날 북클럽을 모집합니다! 참여대상: 책을
            사랑하는 누구나! 다양한 장르의 책을 좋아하시는 분들 환영. 모임 방식:
            한 권의 책을 선정하여 함께 읽고, 각자 읽은 내용을 공유합니다. 책에
            대한 의견을 나누고, 서로의 생각을 들을 수 있는 편안한 분위기에서
            자유롭게 대화합니다. 다양한 사람들과 책을 통해 소통하며, 새로운
            친구를 만날 기회도 있어요! 책과 함께하는 소중한 시간을 만들고 싶으신
            분들, 많은 참여 부탁드려요! 그럼 일요일 아침,여러분을 기다리고
            있을게요! 📖💬
          </p>
        </div>

        <div className="map">
          <p className="group_span" style={{ fontSize: '37px' }}>
            <FontAwesomeIcon icon={faLocationDot} />
            &nbsp;모임장소
          </p>
          <h4>투썸플레이스 역삼역점</h4>

          <p className="detail_address">서울특별시 강남구 테헤란로27길 16</p>

          <GoogleMap address={'역삼역'} />
        </div>

        <div>

          <p className="group_span" style={{ fontSize: '37px' }}>
            모임 후기
          </p>
          <div className="review_board mt-4">
            <ul id="board_list" className="list-unstyled">
              {groupedReviews.map((group, index) => (
                <div
                  className="d-flex justify-content-start gap-5 mb-4"

                  key={index}
                >
                  {group.map((object) => (
                    <div className="review_item" key={object.no}>
                      <Nav.Link href="/review/Read">
                        <img
                          src={object.img}
                          alt="review"
                          className="review_img"
                        />
                      </Nav.Link>


                      <div className="d-flex justify-content-between align-content-center mt-1 me-4 ms-4">

                        <Nav.Link href="/review/Read">{object.title}</Nav.Link>
                        <span style={{ fontSize: '12px' }}>
                          평점: {object.rating}
                        </span>
                      </div>

                      <div
                        className="club_name d-flex align-content-center"
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        {completedMeetings[0].name}
                      </div>

                    </div>
                  ))}
                </div>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="group_span" style={{ fontSize: '30px' }}>
            환불 규정
          </p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>취소 시점</th>
                <th>환불 규정</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>모임 시작 7일 전까지</th>
                <td>전액 환불</td>
              </tr>
              <tr>
                <th>모임 시작 3일 전까지</th>
                <td>참가비의 50% 환불</td>
              </tr>
              <tr>
                <th>모임 시작 3일 이내</th>
                <td>환불 불가</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p className="group_span" style={{ fontSize: '30px' }}>
            이런 모임은 어때요?
          </p>
          <div className="cards">
            <div className="card" style={{ width: '18rem' }}>
              <img
                src="/images/media1.jpg"
                className="card-img-top"
                alt="추천 모임 이미지"
              />
              <div className="card-body">
                <h5 className="card-title">Card with stretched link</h5>
                <a href="#" className="btn btn-primary stretched-link">
                  Go somewhere
                </a>
              </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
              <img
                src="/images/media1.jpg"
                className="card-img-top"
                alt="추천 모임 이미지"
              />
              <div className="card-body">
                <h5 className="card-title">Card with stretched link</h5>
                <a href="#" className="btn btn-primary stretched-link">
                  Go somewhere
                </a>
              </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
              <img
                src="/images/media1.jpg"
                className="card-img-top"
                alt="추천 모임 이미지"
              />
              <div className="card-body">
                <h5 className="card-title">Card with stretched link</h5>
                <a href="#" className="btn btn-primary stretched-link">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* 권한별 버튼 */}
        <div className="button">

          {/* 비회원 권한일 때 */}
          {userRole === 'member' && (
            <>
              <button
                onClick={() => {
                  fetch('http://localhost:8080/member/statusUpdate', {
                    method: 'post',
                    body: Form,
                  });
                }}
              >
                <FontAwesomeIcon icon={faHeart} />
                &nbsp;찜하기
              </button>
              <button
                onClick={() => {
                  fetch('http://localhost:8080/member/statusUpdate', {
                    method: 'post',
                    body: Form,
                  });
                }}
              >
                참가 신청하기
              </button>
            </>
          )}

          {/* 모임멤버 권한일 때 */}
          {userRole === 'group_member' && (
            <button onClick={() => setModalShow(true)}>
              <FontAwesomeIcon icon={faComments} />
              &nbsp;모임 채팅 참여하기
            </button>
          )}

          {/* 모임장 권한일 때 */}
          {userRole === 'group_leader' && (
            <>
              <button onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faComments} />
                &nbsp;모임 채팅 참여하기
              </button>
              <button onClick={handleButtonClick}>&nbsp;모임 관리하기</button>
            </>
          )}
        </div>

        <ChatRoom show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </Container>
  );
}

export default GroupDetail;
