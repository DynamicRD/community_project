import { useState } from 'react';
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

// 후기 데이터
const initialReviews = [
  {
    no: 1,
    review_no: '1',
    review_title: '안녕하세요',
    nickname: '문정배',
    img_url: '/images/review1.png',
    star: 5,
    isblacked: 'N',
  },
  {
    no: 2,
    review_no: '2',
    review_title: '안녕하세요',
    nickname: '문정배',
    img_url: '/images/review1.png',
    star: 5,
    isblacked: 'N',
  },
  {
    no: 3,
    review_no: '3',
    review_title: '안녕하세요',
    nickname: '문정배',
    img_url: '/images/review1.png',
    star: 5,
    isblacked: 'N',
  },
  {
    no: 4,
    review_no: '4',
    review_title: '안녕하세요',
    nickname: '문정배',
    img_url: '/images/review1.png',
    star: 5,
    isblacked: 'N',
  },
  {
    no: 5,
    review_no: '5',
    review_title: '안녕하세요',
    nickname: '문정배',
    img_url: '/images/review1.png',
    star: 5,
    isblacked: 'N',
  },
  {
    no: 6,
    review_no: '6',
    review_title: '안녕하세요',
    nickname: '문정배',
    img_url: '/images/review1.png',
    star: 5,
    isblacked: 'N',
  },
];

const reviewsPerPage = 6;
const ReviewSection = () => {
  const [reviewList, setReviewList] = useState(initialReviews);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviewList.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = reviewList.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleBlind = (no) => {
    setReviewList((prevReviews) =>
      prevReviews.map((review) =>
        review.no === no
          ? { ...review, isblacked: review.isblacked === 'Y' ? 'N' : 'Y' }
          : review
      )
    );
  };

  return (
    <Container>
      <h2 className="mb-4">후기 관리</h2>
      <div className="review_board mt-4">
        <div className="d-flex flex-wrap justify-content-start gap-4">
          {paginatedReviews.map((review) => (
            <Card
              key={review.no}
              className="p-3 text-center"
              style={{ width: '30%' }}
            >
              {review.isblacked === 'Y' ? (
                <p>⚠️ 후기가 블라인드 처리되었습니다.</p>
              ) : (
                <>
                  <p>
                    <strong>{review.review_title}</strong>
                  </p>
                  <Link to={`/admin/board/${review.no}`}>
                    <img
                      src={review.img_url}
                      alt="review"
                      className="img-fluid"
                    />
                  </Link>
                  <p>작성자: {review.nickname}</p>
                </>
              )}
              <Button
                variant={review.isblacked === 'Y' ? 'primary' : 'danger'}
                onClick={() => toggleBlind(review.no)}
                className="mt-2"
              >
                {review.isblacked === 'Y' ? '블라인드 해제' : '블라인드 처리'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <Pagination className="mt-4 justify-content-center">
        <Pagination.Prev
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
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
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
};

// 댓글 관리 컴포넌트
const CommentSection = () => {
  const initialComments = [
    {
      no: 1,
      reviewNo: 1,
      nickname: '김유신',
      content: '좋은 후기네요!',
      reg_date: '2024-02-10',
      isblacked: 'N',
    },
    {
      no: 2,
      reviewNo: 2,
      nickname: '이순신',
      content: '정말 유익한 정보였습니다.',
      reg_date: '2024-02-11',
      isblacked: 'Y',
    },
    {
      no: 3,
      reviewNo: 3,
      nickname: '강감찬',
      content: '다음에도 또 올게요!',
      reg_date: '2024-02-12',
      isblacked: 'N',
    },
    {
      no: 4,
      reviewNo: 4,
      nickname: '을지문덕',
      content: '아주 유용한 글입니다.',
      reg_date: '2024-02-13',
      isblacked: 'Y',
    },
  ];

  const [comments, setComments] = useState(initialComments);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  // **검색 필터**
  const filteredComments = comments.filter(
    (comment) =>
      comment.nickname.includes(search) || comment.content.includes(search)
  );

  // **블라인드 상태 토글 함수**
  const toggleBlindStatus = (no) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.no === no
          ? { ...comment, isblacked: comment.isblacked === 'Y' ? 'N' : 'Y' }
          : comment
      )
    );
  };

  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const paginatedComments = filteredComments.slice(
    startIndex,
    startIndex + commentsPerPage
  );

  // **댓글 삭제**
  const deleteComment = (no) => {
    setComments(comments.filter((comment) => comment.no !== no));
  };

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
            <th>블라인드처리</th>
          </tr>
        </thead>
        <tbody>
          {paginatedComments.length > 0 ? (
            paginatedComments.map((comment) => (
              <tr
                key={comment.no}
                className={comment.isblacked === 'Y' ? 'table-danger' : ''}
              >
                <td>{comment.no}</td>
                <td>{comment.reviewNo}</td>
                <td>{comment.nickname}</td>
                <td>{comment.content}</td>
                <td>{comment.reg_date}</td>
                <td>{comment.isblacked === 'Y' ? '블라인드' : '정상'}</td>
                <td>
                  <Button
                    variant={comment.isblacked === 'Y' ? 'primary' : 'danger'}
                    size="sm"
                    onClick={() => toggleBlindStatus(comment.no)}
                  >
                    {comment.isblacked === 'Y'
                      ? '블라인드 해제'
                      : '블라인드 처리'}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
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
