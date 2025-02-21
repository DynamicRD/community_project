import { Button, Form, ListGroup, Image } from 'react-bootstrap';
import '../GroupDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faList,
  faLocationDot,
  faSackDollar,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import MemberProfileView from './MemberProfileView';
import GoogleMap from './GoogleMap';
import axios from 'axios';

export default function GroupDetailItem({ item }) {
  const [category, setCategory] = useState(null);
  const [groups, setGroups] = useState([]);
  const [activeMembers, setActiveMembers] = useState([]);
  const [userRole, setUserRole] = useState();
  useEffect(() => {
    fetch(`http://localhost:8080/group/memberList?group_no=${item.GROUP_NO}`)
      .then((res) => res.json())
      .then((data) => {
        // 참여 중인 멤버 목록
        const activeMembers = data.filter((item) => item.STATUS === 'MEMBER');

        // 상태 설정
        setActiveMembers(activeMembers);
      })
      .catch((error) => console.error('Error fetching group members:', error));
  }, [item.GROUP_NO, item]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/group/detailselect?category=${item.CATEGORY}`
        );
        setGroups(response.data);
        console.log('Fetched groups:', response.data);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
        setGroups([]);
      }
    };
    if (item.CATEGORY) {
      fetchGroups();
    }
  }, [item.CATEGORY]);

  //멤버 프로필 띄우기
  const [profileShow, setProfileShow] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const profileOpen = (id) => {
    const member = activeMembers.find((member) => member.NO === id);
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

  const textareaRef = useRef(null);

  useEffect(() => {
    // 페이지 로드 시 textarea 높이를 자동으로 조정
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 먼저 높이를 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 텍스트 길이에 맞게 높이 조정
    }
  }, [item.COMMENT2]); // COMMENT2 내용이 변경될 때마다 실행

  return (
    <div className="group_detail">
      <div className="information row">
        <div className="col-6">
          <Link to={`/group/${item.TYPE}_list`}>
            <h4>{item.TYPE === 'regular' ? `정기모임>` : '동행ㆍ소모임>'}</h4>
          </Link>
          <img
            className="img-fluid"
            src={`http://localhost:8080/upload/${item.IMG_URL1}`}
            alt="모임 이미지"
            style={{ width: '100%', height: '400px' }}
          />
        </div>
        <div className="information_detail col">
          &nbsp;
          <div>
            <p>
              <FontAwesomeIcon icon={faList} />
              &nbsp;{item.CATEGORY === 'culture' && '문화/예술'}
              {item.CATEGORY === 'food' && '푸드/드링크'}
              {item.CATEGORY === 'edu' && '교육'}
              {item.CATEGORY === 'travel' && '여행'}
              {item.CATEGORY === 'hobby' && '취미'}
            </p>
            <span className="group_span" style={{ fontSize: '35px' }}>
              {item.GROUP_TITLE}
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
              &nbsp; 모집 인원 {item.MEMBER_COUNT} / {item.USER_MAX}명
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
            🌟 {item.GROUP_TITLE} 모임장 한마디 🌟
          </p>
          <br />
          {item.COMMENT1}
        </div>
        <div className="profile mt-5">
          <div className="d-flex align-items-center">
            <img
              src={`http://localhost:8080/upload/${item.PROFILE_IMG}`}
              alt="모임장 프로필"
              className="rounded-circle"
            />
            <h3 className="p-2">{item.NICKNAME} 모임장</h3>
          </div>
          <h4>
            {item.STAR_SUM === 0
              ? '아직 등록된 평점이 없습니다.'
              : `평균별점 ${item.STAR_SUM}`}
          </h4>
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
        {item.IMG_URL2 && (
          <img
            className="img-fluid centered-image"
            src={`http://localhost:8080/upload/${item.IMG_URL2}`}
          />
        )}
        {item.IMG_URL3 && (
          <img
            className="img-fluid centered-image"
            src={`http://localhost:8080/upload/${item.IMG_URL3}`}
          />
        )}
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            value={item.COMMENT2}
            readOnly
            ref={textareaRef}
            // onChange={handleTextChange}
            // onInput={autoResizeTextarea}  // 텍스트가 입력될 때마다 높이 조정
            style={{
              border: 'none',
              height: 'auto',
              overflow: 'hidden',
              resize: 'none', // 사용자가 직접 크기를 조정하지 못하게 설정
            }}
          />
        </Form.Group>
      </div>
      {item.MEMBER_COUNT > 0 && (
        <div className="groupMemberList">
          <p
            style={{
              fontSize: '35px',
              marginBottom: '10px',
              fontWeight: '700',
            }}
          >
            현재 참여중인 멤버({item.MEMBER_COUNT}/{item.USER_MAX})
          </p>
          <ListGroup as="ol">
            {activeMembers.map((member) => {
              return (
                <ListGroup.Item
                  key={member.NO}
                  as="li"
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="ms-2 me-auto">
                    <div>
                      <Image
                        src={`http://localhost:8080/upload/${member.IMG_URL}`}
                        roundedCircle
                        style={{ height: '40px', width: '40px' }}
                      />{' '}
                      &nbsp;<span className="fs-5">{member.NICKNAME}</span>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => profileOpen(member.NO)}
                  >
                    프로필 보기
                  </Button>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      )}

      <div className="map">
        <p style={{ fontSize: '37px', fontWeight: '700' }}>
          <FontAwesomeIcon icon={faLocationDot} />
          &nbsp;모임장소
        </p>
        <h5>{item.ADDR1}</h5>

        <p className="detail_address">{item.ADDR2}</p>

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
              <th>참가 승인 전, 모임 시작 7일 전까지</th>
              <td>전액 환불</td>
            </tr>
            {/* <tr>
              <th>모임 시작 3일 전까지</th>
              <td>참가비의 50% 환불</td>
            </tr> */}
            <tr>
              <th>모임 시작 3일 이내</th>
              <td>환불 불가</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {groups?.length === 0 ? (
          <></>
        ) : (
          <>
            <p style={{ fontSize: '30px', fontWeight: '700' }}>
              이런 모임은 어때요?
            </p>
            <div className="cards">
              {groups.map((group, index) => (
                <div key={index} className="card" style={{ width: '18rem' }}>
                  <Link
                    to={`/group/detail?group_no=${group.groupNo}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <img
                      src={`http://localhost:8080/upload/${group.imgUrl1}`}
                      className="card-img-top"
                      alt={group.gtitle}
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{group.gtitle}</h5>
                      <p className="card-text">
                        {formatDate(group.startDate)} / {group.addr1}
                      </p>
                      <a
                        href={`/group/detail?group_no=${group.groupNo}`}
                        className="btn btn-primary stretched-link"
                      >
                        자세히 보기
                      </a>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <MemberProfileView
        show={profileShow}
        onHide={() => setProfileShow(false)}
        member={selectedMember}
      />
    </div>
  );
}
