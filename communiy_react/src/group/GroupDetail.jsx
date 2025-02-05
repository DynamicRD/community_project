import { Container } from 'react-bootstrap';
import './GroupDetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faHeart,
  faList,
  faLocationDot,
  faSackDollar,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
<style>
  .group_detail( box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px; border-radius:
  10px; padding: 50px 30px; )
</style>;

function GroupDetail() {
  return (
    <Container>
      <div className="group_detail">
        <div className="information col">
          <div>
            <a href="#">
              <h4>동행, 소모임&gt;</h4>
            </a>
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
              <h2>역삼역 일요일 아침 북클럽 모집</h2>
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
            <h3>🌟 역삼역 일요일 아침 북클럽 모임장 한마디 🌟</h3>
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
          <h2>우리 모임은요</h2>
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
          <h2>
            <FontAwesomeIcon icon={faLocationDot} />
            &nbsp;모임장소
          </h2>
          <h4>투썸플레이스 역삼역점</h4>
          <p>서울특별시 강남구 테헤란로27길 16</p>
          <img src="/images/map.png" alt="모임 장소 지도" />
        </div>
        <div>
          <h2>모임 후기</h2>
        </div>
        <div>
          <h4>환불 규정</h4>
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
          <h4>이런 모임은 어때요?</h4>
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
        <div className="button">
          <button>
            <FontAwesomeIcon icon={faHeart} />
            &nbsp;찜하기
          </button>
          <button>참가 신청하기</button>
        </div>
      </div>
    </Container>
  );
}

export default GroupDetail;
