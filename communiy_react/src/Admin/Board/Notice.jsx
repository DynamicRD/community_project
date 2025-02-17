import React, { useState } from 'react';
import { Container, Nav, Form, Button } from 'react-bootstrap';
import '/src/announcements/Announcements_notice.css';
import HorizonLine_table from '/src/announcements/HorizonLine_table';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';

export default function Notice() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;
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
      <div className="ms-5 mt-5 pt-2 ">
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
}
