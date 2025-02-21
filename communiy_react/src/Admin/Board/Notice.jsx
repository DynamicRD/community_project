import React, { useEffect, useRef, useState } from 'react';
import { Container, Nav, Form, Button, Pagination } from 'react-bootstrap';
import '/src/announcements/Announcements_notice.css';
import HorizonLine_table from '/src/announcements/HorizonLine_table';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Notice() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  function getList(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAnnouncements(data);
      });
  }

  //페이지 시작 시 getList 호출
  useEffect(() => {
    getList('http://localhost:8080/announcements/notice/list');
  }, []);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    console.log(announcements);
  }, [announcements]);

  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 5;

  const totalPages = Math.ceil(announcements.length / announcementsPerPage);
  const startIndex = (currentPage - 1) * announcementsPerPage;
  const paginatedAnnouncements = announcements.slice(
    startIndex,
    startIndex + announcementsPerPage
  );
  const newTitle = useRef();
  const newContent = useRef();

  //공지사항 입력 폼
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const formData = new FormData();
    formData.append('n_title', newTitle.current.value);
    formData.append('content', newContent.current.value);
    try {
      const response = await axios.post(
        'http://localhost:8080/announcements/notice/insert',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('업로드 성공:', response.data);
      getList('http://localhost:8080/announcements/notice/list');
    } catch (error) {
      console.error('업로드 실패:', error);
    }
    setShowForm(false);
  };

  return (
    <Container>
      <div>
        <div className="d-flex justify-content-end my-3">
          <Button
            variant="dark"
            onClick={() => setShowForm(!showForm)}
            className="btn_group4"
          >
            {showForm ? '작성 취소' : '새 공지 작성'}
          </Button>
        </div>
        {showForm && (
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="inputformmb-2">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" ref={newTitle} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" rows={3} ref={newContent} required />
            </Form.Group>
            <Button variant="danger" type="submit">
              작성 완료
            </Button>
          </Form>
        )}

        <Container>
          <table className="announcements_table">
            {paginatedAnnouncements.map((notice) => (
              <tbody key={notice.NOTICE_NO}>
                <tr>
                  <td className="table_td_title">
                    <Link
                      to={`/admin/board/Notice/${notice.NOTICE_NO}`}
                      className="title_link"
                    >
                      <span className="ps-5">{notice.NOTICE_TITLE}</span>
                    </Link>
                  </td>
                  <td className="table_td_date">
                    <span className="pe-5">{notice.REG_DATE}</span>
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
