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
    id: 1,
    title: '안녕하세요',
    writer: '문정배',
    img: '/images/review1.png',
    rating: 0,
    hidden: false,
  },
  {
    id: 2,
    title: '배송이 빨라서 좋았어요.',
    writer: '문정배2',
    img: '/images/review1.png',
    rating: 1,
    hidden: false,
  },
  {
    id: 3,
    title: '가격 대비 만족스럽습니다.',
    writer: '문정배3',
    img: '/images/review1.png',
    rating: 2,
    hidden: false,
  },
  {
    id: 4,
    title: '다시 구매할 예정입니다.',
    writer: '문정배4',
    img: '/images/review1.png',
    rating: 3,
    hidden: false,
  },
  {
    id: 5,
    title: '디자인이 예뻐요!',
    writer: '문정배5',
    img: '/images/review1.png',
    rating: 4,
    hidden: false,
  },
  {
    id: 6,
    title: '품질이 정말 좋아요.',
    writer: '문정배6',
    img: '/images/review1.png',
    rating: 5,
    hidden: false,
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

  const toggleBlind = (id) => {
    setReviewList((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, hidden: !review.hidden } : review
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
              key={review.id}
              className="p-3 text-center"
              style={{ width: '30%' }}
            >
              {review.hidden ? (
                <p>⚠️ 후기가 블라인드 처리되었습니다.</p>
              ) : (
                <>
                  <p>
                    <strong>{review.title}</strong>
                  </p>
                  <Link to={`/admin/board/${review.id}`}>
                    <img src={review.img} alt="review" className="img-fluid" />
                  </Link>
                  <p>작성자: {review.writer}</p>
                </>
              )}
              <Button
                variant={review.hidden ? 'primary' : 'danger'}
                onClick={() => toggleBlind(review.id)}
                className="mt-2"
              >
                {review.hidden ? '블라인드 해제' : '블라인드 처리'}
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
      id: 1,
      reviewId: 1,
      writer: '김유신',
      title: '좋아요',
      content: '좋은 후기네요!',
      date: '2024-02-10',
      status: '정상',
    },
    {
      id: 2,
      reviewId: 1,
      writer: '이순신',
      title: '좋습니다',
      content: '도움이 되는 정보였습니다.',
      date: '2024-02-09',
      status: '정상',
    },
    {
      id: 3,
      reviewId: 2,
      writer: '홍길동',
      title: '별로에요',
      content: '이 모임 별로였어요.',
      date: '2024-02-08',
      status: '신고됨',
    },
    {
      id: 4,
      reviewId: 3,
      writer: '김유신',
      title: '좋아요',
      content: '좋은 후기네요!',
      date: '2024-02-10',
      status: '정상',
    },
    {
      id: 5,
      reviewId: 4,
      writer: '이순신',
      title: '좋습니다',
      content: '도움이 되는 정보였습니다.',
      date: '2024-02-09',
      status: '정상',
    },
    {
      id: 6,
      reviewId: 5,
      writer: '홍길동',
      title: '별로에요',
      content: '이 모임 별로였어요.',
      date: '2024-02-08',
      status: '신고됨',
    },
    {
      id: 7,
      reviewId: 6,
      writer: '김유신',
      title: '좋아요',
      content: '좋은 후기네요!',
      date: '2024-02-10',
      status: '정상',
    },
    {
      id: 8,
      reviewId: 7,
      writer: '이순신',
      title: '좋습니다',
      content: '도움이 되는 정보였습니다.',
      date: '2024-02-09',
      status: '정상',
    },
    {
      id: 9,
      reviewId: 8,
      writer: '홍길동',
      title: '별로에요',
      content: '이 모임 별로였어요.',
      date: '2024-02-08',
      status: '신고됨',
    },
    {
      id: 10,
      reviewId: 9,
      writer: '김유신',
      title: '좋아요',
      content: '좋은 후기네요!',
      date: '2024-02-10',
      status: '정상',
    },
    {
      id: 11,
      reviewId: 10,
      writer: '이순신',
      title: '좋습니다',
      content: '도움이 되는 정보였습니다.',
      date: '2024-02-09',
      status: '정상',
    },
    {
      id: 12,
      reviewId: 11,
      writer: '홍길동',
      title: '별로에요',
      content: '이 모임 별로였어요.',
      date: '2024-02-08',
      status: '신고됨',
    },
  ];

  const [comments, setComments] = useState(initialComments);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  const filteredComments = comments.filter(
    (comment) =>
      comment.writer.includes(search) ||
      comment.content.includes(search) ||
      comment.title.includes(search)
  );
  // **블라인드 상태 토글 함수**
  const toggleBlindStatus = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              status: comment.status === '신고됨' ? '정상' : '신고됨',
            }
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

  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">댓글 관리</h2>

      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="댓글 검색 (작성자, 제목, 내용)"
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
            <th>제목</th>
            <th>내용</th>
            <th>작성일</th>
            <th>상태</th>
            <th>블라인드처리</th>
          </tr>
        </thead>
        <tbody>
          {paginatedComments.map((comment) => (
            <tr
              key={comment.id}
              className={comment.status === '신고됨' ? 'table-danger' : ''}
            >
              <td>{comment.id}</td>
              <td>{comment.reviewId}</td>
              <td>{comment.writer}</td>
              <td>{comment.title}</td>
              <td>{comment.content}</td>
              <td>{comment.date}</td>
              <td>{comment.status}</td>
              <td>
                <Button
                  variant={comment.status === '신고됨' ? 'primary' : 'danger'}
                  size="sm"
                  onClick={() => toggleBlindStatus(comment.id)}
                >
                  {comment.status === '신고됨'
                    ? '블라인드 해제'
                    : '블라인드 처리'}
                </Button>
              </td>
            </tr>
          ))}
          ) :{' '}
          {
            <tr>
              <td colSpan="8" className="text-center">
                검색 결과가 없습니다.
              </td>
            </tr>
          }
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
const announcementData = [
  {
    no: 1,
    title: '문정배에 대한 고찰',
    content: '문정배 최고라고 생각합니다1',
    date: formattedDate,
  },
  {
    no: 2,
    title: '문정배에 대한 고찰',
    content:
      ' 문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배 최고문정배   ',
    date: formattedDate,
  },
  {
    no: 3,
    title: '문정배에 대한 고찰',
    content: '문정배 최고라고 생각합니다3',
    date: formattedDate,
  },
  {
    no: 4,
    title: '문정배에 대한 고찰',
    content: '문정배 최고라고 생각합니다4',
    date: formattedDate,
  },
  {
    no: 5,
    title: '문정배에 대한 고찰',
    content: '문정배 최고라고 생각합니다5',
    date: formattedDate,
  },
];

const NoticeFaq = () => {
  const [announcements, setAnnouncements] = useState([
    {
      no: 1,
      title: '문정배에 대한 고찰',
      content: '문정배 최고라고 생각합니다1',
      date: formattedDate,
    },
    {
      no: 2,
      title: '문정배에 대한 고찰',
      content: '문정배 최고문정배 최고문정배 최고',
      date: formattedDate,
    },
    {
      no: 3,
      title: '문정배에 대한 고찰',
      content: '문정배 최고라고 생각합니다3',
      date: formattedDate,
    },
    {
      no: 4,
      title: '문정배에 대한 고찰',
      content: '문정배 최고라고 생각합니다4',
      date: formattedDate,
    },
    {
      no: 5,
      title: '문정배에 대한 고찰',
      content: '문정배 최고라고 생각합니다5',
      date: formattedDate,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newAnnouncement = {
      no: announcements.length + 1,
      title: newTitle,
      content: newContent,
      date: formattedDate,
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
              <tbody key={notice.no}>
                <tr>
                  <td className="table_td_title">
                    <Link
                      to={`/admin/board/Notice/${notice.no}`}
                      className="title_link"
                    >
                      <span className="ps-5">{notice.title}</span>
                    </Link>
                  </td>
                  <td className="table_td_date">
                    <span className="pe-5">{notice.date}</span>
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
