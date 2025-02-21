import { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Container,
  Nav,
  Pagination,
  Form,
  Table,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '/src/announcements/Announcements_notice.css';
import HorizonLine_table from '/src/announcements/HorizonLine_table';
import '../../review/Review.css';

const ReviewSection = () => {
  const [reviewList, setReviewList] = useState([]); // ✅ 초기값 빈 배열로 설정
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  // ✅ 후기 목록을 백엔드에서 불러오기 (fetch 사용)
  useEffect(() => {
    fetch('http://localhost:8080/admin/reviews/list') // 올바른 API 엔드포인트 사용
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답 오류');
        }
        return response.json();
      })
      .then((data) => setReviewList(Array.isArray(data) ? data : [])) // ✅ 데이터가 배열인지 확인 후 설정
      .catch((error) => console.error('Error fetching reviews:', error));
  }, [reviewList]); // ✅ 의존성 배열 추가

  const toggleBlind = (no, value) => {
    if (!no) {
      console.error("Error: Invalid 'no' parameter.");
      return;
    }

    const form = new FormData();
    form.append('no', no);
    form.append('isblacked', value);
    fetch('http://localhost:8080/admin/reviews/blind', {
      method: 'POST',
      body: form,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답 오류');
        }
      })
      .then(() => {
        setReviewList((prevReviews) =>
          prevReviews.map((review) =>
            review.reviewNo === no
              ? { ...review, isblacked: review.isblacked === 'Y' ? 'N' : 'Y' }
              : review
          )
        );
      })
      .catch((error) => console.error('Error updating blind status:', error));
  };

  const totalPages = Math.ceil(reviewList.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = reviewList.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  return (
    <Container>
      <h2 className="mb-4">후기 관리</h2>

      {/* 후기 리스트 */}
      <div className="review_board mt-4">
        <div
          className="d-flex flex-wrap justify-content-center gap-3"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '20px',
          }}
        >
          {paginatedReviews.map((review) => (
            <Card
              key={review.reviewNo}
              className="p-3 text-center"
              style={{
                width: '300px', // 카드 가로 크기 고정
                minHeight: '400px', // 카드 세로 크기 조정
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
                overflow: 'hidden',
                boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', // 카드 그림자 추가
                borderRadius: '10px', // 둥근 모서리 적용
              }}
            >
              {review.isblacked === 'Y' ? (
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                  ⚠️ 후기가 블라인드 처리되었습니다.
                </p>
              ) : (
                <>
                  <p>
                    <strong>{review.reviewTitle}</strong>
                  </p>
                  <Link to={`/admin/board/${review.reviewNo}`}>
                    <img
                      src={`http://localhost:8080/upload/${review.imgUrl}`}
                      alt="review"
                      style={{
                        width: '100%', // 이미지 크기 카드 너비에 맞추기
                        maxWidth: '250px', // 너무 커지는 것 방지
                        height: '180px', // 일정한 높이 유지
                        objectFit: 'cover', // 비율을 유지하면서 크기 조절
                        borderRadius: '8px',
                      }}
                    />
                  </Link>
                  <p>작성자: {review.nickname}</p>
                </>
              )}
              <div className="div_btn mt-2">
                <Button
                  variant={review.isblacked === 'Y' ? 'primary' : 'danger'}
                  onClick={() => toggleBlind(review.reviewNo, review.isblacked)}
                  className="blacked_btn me-2 p-2 ps-5 pe-5"
                >
                  {review.isblacked === 'Y' ? '블라인드 해제' : '블라인드 처리'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination className="mt-4 justify-content-center">
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </Container>
  );
};

const CommentSection = () => {
  const [comments, setComments] = useState([]); // 초기값 빈 배열
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  // 🔹 댓글 목록 불러오기
  useEffect(() => {
    fetch(`http://localhost:8080/admin/comments/list`)
      .then((response) => {
        if (!response.ok) throw new Error('댓글 데이터를 가져오지 못했습니다.');
        return response.json();
      })
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching comments:', error));
  }, [comments]);

  // 🔹 블라인드 상태 토글 API 요청
  const form = new FormData();
  const toggleBlindStatus = (no, value) => {
    form.append('no', no);
    form.append('isblacked', value);
    console.log(value);
    console.log(no);
    fetch('http://localhost:8080/admin/comments/blind', {
      method: 'POST',
      body: form,
    })
      // .then((response) => {
      //   if (!response.ok) throw new Error('블라인드 처리 오류');
      //   console.log(response);
      // })
      .then(() => {
        // setComments((prevComments) =>
        //   prevComments.map((comment) =>
        //     comment.no === no
        //       ? { ...comment, isblacked: comment.isblacked === 'Y' ? 'N' : 'Y' }
        //       : comment
        //   )
        // );
      })
      .catch((error) => console.error('Error updating blind status:', error));
    console.log(comments);
  };

  // 🔹 검색 필터 적용
  const filteredComments = comments.filter(
    (comment) =>
      comment.nickname.includes(search) || comment.content.includes(search)
  );

  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const paginatedComments = filteredComments.slice(
    startIndex,
    startIndex + commentsPerPage
  );

  return (
    <Container className="mt-4">
      <h2 className="mb-4">댓글 관리</h2>

      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="댓글 검색 (작성자, 내용)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>후기 ID</th>
            <th>작성자</th>
            <th>내용</th>
            <th>작성일</th>
            <th>상태</th>
            <th>블라인드</th>
          </tr>
        </thead>
        <tbody>
          {paginatedComments.length > 0 ? (
            paginatedComments.map((comment, idx) => (
              <tr
                key={idx}
                className={comment.isblacked === 'Y' ? 'table-danger' : ''}
              >
                <td>{comment.no}</td>
                <td>{comment.reviewNo}</td>
                <td>{comment.nickname}</td>
                <td>{comment.content}</td>
                <td>{comment.regDate}</td>
                <td>{comment.isblacked === 'Y' ? '블라인드' : '정상'}</td>
                <td>
                  <Button
                    variant={comment.isblacked === 'Y' ? 'primary' : 'danger'}
                    size="sm"
                    onClick={() =>
                      toggleBlindStatus(comment.commentsNo, comment.isblacked)
                    }
                  >
                    {comment.isblacked === 'Y' ? '해제' : '처리'}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* 페이징 UI */}
      <Pagination className="mt-4 justify-content-center">
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
};

const today = new Date();
const formattedDate = `${today.getFullYear()}년 ${
  today.getMonth() + 1
}월 ${today.getDate()}일`;

const NoticeFaq = () => {
  const [announcements, setAnnouncements] = useState([
    {
      notice_no: 1,
      notice_title: '문정배에 대한 고찰',
      content: '문정배 최고라고 생각합니다1',
      reg_date: formattedDate,
    },
    {
      notice_no: 2,
      notice_title: '문정배에 대한 고찰',
      content: '문정배 최고라고 생각합니다1',
      reg_date: formattedDate,
    },
    {
      notice_no: 3,
      notice_title: '문정배에 대한 고찰',
      content: '문정배 최고라고 생각합니다1',
      reg_date: formattedDate,
    },
    {
      notice_no: 4,
      notice_title: '문정배에 대한 고찰',
      content: '문정배 최고라고 생각합니다1',
      reg_date: formattedDate,
    },
    {
      notice_no: 5,
      notice_title: '문정배에 대한 고찰',
      content: '문정배 최고라고 생각합니다1',
      reg_date: formattedDate,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newAnnouncement = {
      notice_no: announcements.length + 1,
      notice_title: newTitle,
      content: newContent,
      reg_date: formattedDate,
    };
    setAnnouncements([...announcements, newAnnouncement]);
    setNewTitle('');
    setNewContent('');
    setShowForm(false);
  };

  return (
    <Container>
      <div className="ms-5 mt-5">
        <div className="d-flex ms-5 mt-5 mb-3">
          <Link to={'/admin/board/Notice'} className="title_link">
            <span className="nav_notice" style={{ fontSize: '33px' }}>
              공지사항&nbsp;&nbsp;&nbsp;|
            </span>
          </Link>
          <Link to={'/admin/board/Faq'} className="title_link">
            <span className="nav_notice" style={{ fontSize: '33px' }}>
              &nbsp;&nbsp;&nbsp;FAQ
            </span>
          </Link>
          {/* 글쓰기 버튼 */}
          <div className="btn_group2">
            <Button
              variant="dark"
              onClick={() => setShowForm(!showForm)}
              className="mb-3"
            >
              {showForm ? '작성 취소' : '새 공지 작성'}
            </Button>
          </div>
        </div>

        {/* 공지사항 목록 */}

        {/* 공지사항 입력 폼 (조건부 렌더링) */}
        {showForm && (
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="mb-2">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="danger" type="submit">
              작성 완료
            </Button>
          </Form>
        )}
        <Container>
          <table className="announcements_table">
            {announcements.map((notice) => (
              <tbody key={notice.notice_no}>
                <tr>
                  <td className="table_td_title">
                    <Link
                      to={`/admin/board/Notice/${notice.notice_no}`}
                      className="title_link"
                    >
                      <span className="ps-5">{notice.notice_title}</span>
                    </Link>
                  </td>
                  <td className="table_td_date">
                    <span className="pe-5">{notice.reg_date}</span>
                  </td>
                </tr>
                <HorizonLine_table />
              </tbody>
            ))}
          </table>
        </Container>

        {/* 페이지네이션 */}
        <div className="d-flex justify-content-center align-content-center mt-4">
          <Pagination size="sm">
            {[...Array(5)].map((_, i) => (
              <Pagination.Item key={i + 1} active={i === 0}>
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </Container>
  );
};

// Board 컴포넌트
const Board = () => {
  const [activeSection, setActiveSection] = useState('review');

  return (
    <Container className="pt-5 mt-5">
      <Nav className="mb-3 d-flex gap-2">
        <Nav.Item>
          <Button
            variant="outline-primary"
            onClick={() => setActiveSection('review')}
          >
            후기 관리
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            variant="outline-primary"
            onClick={() => setActiveSection('comment')}
          >
            댓글 관리
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            variant="outline-primary"
            onClick={() => setActiveSection('noticefaq')}
          >
            공지사항 & FAQ 관리
          </Button>
        </Nav.Item>
      </Nav>

      {activeSection === 'review' && <ReviewSection />}
      {activeSection === 'comment' && <CommentSection />}
      {activeSection === 'noticefaq' && <NoticeFaq />}
    </Container>
  );
};

export default Board;
