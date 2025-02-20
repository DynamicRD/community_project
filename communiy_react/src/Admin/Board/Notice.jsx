import React, { useState } from 'react';
import { Container, Nav, Form, Button, Pagination } from 'react-bootstrap';
import '/src/announcements/Announcements_notice.css';
import HorizonLine_table from '/src/announcements/HorizonLine_table';
import { Link } from 'react-router-dom';

export default function Notice() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  const [announcements, setAnnouncements] = useState([
    {
      notice_no: 1,
      notice_title: '문정배에 대한 고찰',
      content: '문정배 최고라고 생각합니다1',
      reg_date: formattedDate,
    },
    {
      notice_no: 2,
      notice_title: '공지사항 예제 2',
      content: '공지사항 내용 2',
      reg_date: formattedDate,
    },
    {
      notice_no: 3,
      notice_title: '공지사항 예제 3',
      content: '공지사항 내용 3',
      reg_date: formattedDate,
    },
    {
      notice_no: 4,
      notice_title: '공지사항 예제 4',
      content: '공지사항 내용 4',
      reg_date: formattedDate,
    },
    {
      notice_no: 5,
      notice_title: '공지사항 예제 5',
      content: '공지사항 내용 5',
      reg_date: formattedDate,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 5;

  const totalPages = Math.ceil(announcements.length / announcementsPerPage);
  const startIndex = (currentPage - 1) * announcementsPerPage;
  const paginatedAnnouncements = announcements.slice(
    startIndex,
    startIndex + announcementsPerPage
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newAnnouncement = {
      notice_no: announcements.length + 1, // ✅ 기존 필드명과 일치
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
      <div className="ms-5 mt-5 pt-2">
        <div className="d-flex ms-5 mt-5 mb-3 pt-5">
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
            {paginatedAnnouncements.map((notice) => (
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
            <Pagination.Prev
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </div>
    </Container>
  );
}
