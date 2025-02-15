import {
  Button,
  Container,
  Form,
  ListGroup,
  Modal,
  Nav,
  Image,
} from 'react-bootstrap';
import '../GroupDetail.css';
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MemberProfileView from './MemberProfileView';
import GoogleMap from './GoogleMap';

export default function GroupDetailItem({ item }) {
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

  //멤버 프로필 띄우기
  const [profileShow, setProfileShow] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const profileOpen = (id) => {
    const member = memberList.find((member) => member.id === id);
    setSelectedMember(member);
    setProfileShow(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid date';

    const daysOfWeek = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return 'Invalid date';

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = daysOfWeek[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day} ${dayOfWeek} ${hours}:${minutes}`;
  };

  return (
    <div className="group_detail">
      <div className="information col">
        <div>
          <Link to={`/group/${item.type}_list`}>
            <h4>{item.TYPE === 'regular' ? `정기모임>` : '동행ㆍ소모임>'}</h4>
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
              {item.G_TITLE}
            </span>
          </div>
          <div>
            <h4>
              <FontAwesomeIcon icon={faCalendar} />
              &nbsp; 시작일 : {formatDate(item.START_DATE)}
            </h4>
            <h4>
              <FontAwesomeIcon icon={faCalendar} />
              &nbsp; 종료일 : {formatDate(item.LAST_DATE)}
            </h4>
            <h4>
              <FontAwesomeIcon icon={faUserGroup} />
              &nbsp; 모집 인원 3 / {item.USER_MAX}명
            </h4>
            <h4>
              <FontAwesomeIcon icon={faSackDollar} />
              &nbsp; 참가비 {item.PRICE}원
            </h4>
          </div>
        </div>
        <hr />
      </div>
      <div className="group_leader">
        <div>
          <p
            style={{ fontSize: '33px', marginBottom: '0px', fontWeight: '700' }}
          >
            🌟 {item.G_TITLE} 모임장 한마디 🌟
          </p>
          {item.COMMENT1}
          <br></br>
          안녕하세요, 역삼역 일요일 아침 북클럽에 오신 여러분을 환영합니다! 📚
          <br></br>
          <br></br>
          새로운 시각을 얻고 싶은 분이라면 누구든지 환영입니다. 부담 없이 오셔서
          즐겁고 의미 있는 시간을 보내요! 😊<br></br>
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
          style={{ fontSize: '37px', marginBottom: '10px', fontWeight: '700' }}
        >
          우리 모임은요
        </p>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            value={item.COMMENT2}
            readOnly
            style={{ border: 'none' }}
          />
        </Form.Group>

        {/* 📚 역삼역 일요일 아침 북클럽 모집!🌞 
          책과 함께 여유로운 일요일
          아침을 보내고 싶으신가요? 
          이번에 역삼역 근처에서 일요일 아침, 책을
          좋아하는 사람들과 함께 만날 북클럽을 모집합니다! 참여대상: 책을
          사랑하는 누구나! 다양한 장르의 책을 좋아하시는 분들 환영. 모임
          방식: 한 권의 책을 선정하여 함께 읽고, 각자 읽은 내용을
          공유합니다. 책에 대한 의견을 나누고, 서로의 생각을 들을 수 있는
          편안한 분위기에서 자유롭게 대화합니다. 다양한 사람들과 책을 통해
          소통하며, 새로운 친구를 만날 기회도 있어요! 책과 함께하는 소중한
          시간을 만들고 싶으신 분들, 많은 참여 부탁드려요! 그럼 일요일
          아침,여러분을 기다리고 있을게요! 📖💬 */}
      </div>

      <div className="groupMemberList">
        <p
          style={{ fontSize: '35px', marginBottom: '10px', fontWeight: '700' }}
        >
          현재 참여중인 멤버(3/{item.USER_MAX})
        </p>
        <ListGroup as="ol">
          {memberList.map((member) => {
            return (
              <ListGroup.Item
                key={member.id}
                as="li"
                className="d-flex justify-content-between align-items-center"
              >
                <div className="ms-2 me-auto">
                  <div>
                    <Image
                      src="../images/시나모롤.jpg"
                      roundedCircle
                      style={{ height: '40px', width: '40px' }}
                    />{' '}
                    &nbsp;<span className="fs-5">{member.nickname}</span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  onClick={() => profileOpen(member.id)}
                >
                  프로필 보기
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>

      <div className="map">
        <p style={{ fontSize: '37px', fontWeight: '700' }}>
          <FontAwesomeIcon icon={faLocationDot} />
          &nbsp;모임장소
        </p>
        <h4>{item.ADDR2}</h4>

        <p className="detail_address">{item.ADDR1}</p>

        <GoogleMap
          addr1={item.ADDR1}
          latitude={item.LATITUDE}
          longitude={item.LONGITUDE}
        />
      </div>

      <div>
        <p style={{ fontSize: '30px', fontWeight: '700' }}>환불 규정</p>
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
        <p style={{ fontSize: '30px', fontWeight: '700' }}>
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
      <MemberProfileView
        show={profileShow}
        onHide={() => setProfileShow(false)}
        member={selectedMember}
      />
    </div>
  );
}
