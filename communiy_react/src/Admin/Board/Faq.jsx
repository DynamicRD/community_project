import React, { useState } from 'react';
import '/src/announcements/Announcements_faq.css';
import {
  Container,
  Pagination,
  Accordion,
  Button,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Faq() {
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
  ]);

  const [faqData, setFaqData] = useState([
    {
      no: 1,
      title: 'FAQ 질문 1',
      content: 'FAQ 답변 1',
      date: formattedDate,
    },
    {
      no: 2,
      title: 'FAQ 질문 2',
      content: 'FAQ 답변 2',
      date: formattedDate,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddFaq = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newFaq = {
      no: Date.now(),
      title: newTitle,
      content: newContent,
      date: formattedDate,
    };

    setFaqData((prevFaqData) => [...prevFaqData, newFaq]);
    setNewTitle('');
    setNewContent('');
    setShowForm(false);
  };

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleEdit = (faq) => {
    setEditingId(faq.no);
    setEditedTitle(faq.title);
    setEditedContent(faq.content);
  };

  const handleSave = () => {
    setFaqData(
      faqData.map((faq) =>
        faq.no === editingId
          ? { ...faq, title: editedTitle, content: editedContent }
          : faq
      )
    );
    setEditingId(null);
  };

  const handleDelete = (no) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setFaqData(faqData.filter((faq) => faq.no !== no));
    }
  };

  const totalPages = Math.ceil(faqData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaqData = faqData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container className="d-flex justify-content-center">
      <div className="mt-5 ms-5 pt-5">
        <div className="d-flex mt-5 ms-5">
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
        </div>
        {/* FAQ 글쓰기 버튼 */}
        <Button
          variant="dark"
          onClick={() => setShowForm(!showForm)}
          className="btn_group3"
        >
          {showForm ? '작성 취소' : '새 질문 작성'}
        </Button>

        {/* FAQ 입력 폼 (조건부 렌더링) */}
        {showForm && (
          <Form onSubmit={handleAddFaq} className="mb-4">
            <Form.Group className="mb-2">
              <Form.Label>질문</Form.Label>
              <Form.Control
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>답변</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="danger" type="submit">
              등록
            </Button>
          </Form>
        )}
        <Container>
          <Accordion defaultActiveKey="0">
            {paginatedFaqData.map((faq) => (
              <Accordion.Item eventKey={faq.no} key={faq.no} className="mb-3">
                <Accordion.Header>
                  {editingId === faq.no ? (
                    <Form.Control
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  ) : (
                    <span
                      className="faq_accordion_title"
                      style={{ width: '1100px', height: '50px' }}
                    >
                      {faq.title}
                    </span>
                  )}
                </Accordion.Header>
                <Accordion.Body>
                  {editingId === faq.no ? (
                    <>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="mb-2"
                      />
                      <div className="d-flex justify-content-end mt-2">
                        <Button
                          variant="success"
                          onClick={handleSave}
                          className="me-2"
                        >
                          저장
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditingId(null)}
                        >
                          취소
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span
                        className="faq_accordion_body"
                        style={{ width: '1100px' }}
                      >
                        {faq.content}
                      </span>
                      <div className="d-flex justify-content-end mt-2">
                        <Button
                          variant="primary"
                          onClick={() => handleEdit(faq)}
                          className="me-2"
                        >
                          수정
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(faq.no)}
                        >
                          삭제
                        </Button>
                      </div>
                    </>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
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
      </div>
    </Container>
  );
}
