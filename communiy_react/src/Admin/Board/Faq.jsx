import React, { useEffect, useRef, useState } from 'react';
import '/src/announcements/Announcements_faq.css';
import {
  Container,
  Pagination,
  Accordion,
  Button,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Faq() {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  const [faqData, setFaqData] = useState([]);
  function getList(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFaqData(data);
      });
  }

  //페이지 시작 시 getList 호출
  useEffect(() => {
    getList('http://localhost:8080/announcements/faq/list');
  }, []);

  useEffect(() => {
    console.log(faqData);
  }, [faqData]);

  const newTitle = useRef();
  const newContent = useRef();
  const [showForm, setShowForm] = useState(false);

  const handleAddFaq = async (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newFaq = {
      faq_no: Date.now(),
      faq_title: newTitle,
      content: newContent,
      reg_date: formattedDate,
    };
    const formData = new FormData();
    formData.append('n_title', newTitle.current.value);
    formData.append('content', newContent.current.value);
    try {
      const response = await axios.post(
        'http://localhost:8080/announcements/faq/insert',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('업로드 성공:', response.data);
      getList('http://localhost:8080/announcements/faq/list');
    } catch (error) {
      console.error('업로드 실패:', error);
    }
    setFaqData((prevFaqData) => [...prevFaqData, newFaq]);
    setShowForm(false);
  };

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleEdit = (faq) => {
    setEditingId(faq.FAQ_NO);
    setEditedTitle(faq.FAQ_TITIE);
    setEditedContent(faq.CONTENT);
  };

  const handleSave = () => {
    setFaqData(
      faqData.map((faq) =>
        faq.FAQ_NO === editingId
          ? { ...faq, FAQ_TITLE: editedTitle, CONTENT: editedContent }
          : faq
      )
    );
    setEditingId(null);
  };

  const handleDelete = (no) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setFaqData(faqData.filter((faq) => faq.FAQ_NO !== no));
    }
  };

  const totalPages = Math.ceil(faqData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaqData = faqData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container>
      <div>
        {/* FAQ 글쓰기 버튼 (FAQ가 없어도 항상 보이도록 변경) */}
        <div className="d-flex justify-content-end my-3">
          <Button
            variant="dark"
            onClick={() => setShowForm(!showForm)}
            className="btn_group4"
          >
            {showForm ? '작성 취소' : '새 질문 작성'}
          </Button>
        </div>

        {/* FAQ 입력 폼 */}
        {showForm && (
          <Form onSubmit={handleAddFaq} className="mb-4">
            <Form.Group className="inputform mb-2">
              <Form.Label>질문</Form.Label>
              <Form.Control
                type="text"
                ref={newTitle}
                required
                style={{ width: '1100px', height: '50px' }}
              />
            </Form.Group>
            <Form.Group className="inputform mb-2">
              <Form.Label>답변</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                ref={newContent}
                required
                style={{ width: '1100px', height: '50px' }}
              />
            </Form.Group>
            <Button variant="danger" type="submit" className="register_btn">
              등록
            </Button>
          </Form>
        )}

        {/* FAQ 리스트 (FAQ가 없을 경우에도 버튼은 유지됨) */}
        <Container>
          {faqData.length > 0 ? (
            <Accordion defaultActiveKey="0">
              {paginatedFaqData.map((faq) => (
                <Accordion.Item
                  eventKey={faq.FAQ_NO}
                  key={faq.FAQ_NO}
                  className="mb-3"
                >
                  <Accordion.Header>
                    {editingId === faq.FAQ_NO ? (
                      <Form.Control
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        style={{ width: '1100px', height: '50px' }}
                      />
                    ) : (
                      <span
                        className="faq_accordion_title"
                        style={{ width: '1100px', height: '50px' }}
                      >
                        {faq.FAQ_TITLE}
                      </span>
                    )}
                  </Accordion.Header>
                  <Accordion.Body>
                    {editingId === faq.FAQ_NO ? (
                      <>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="mb-2"
                          style={{ width: '1100px', height: '50px' }}
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
                          style={{ width: '1100px', height: '50px' }}
                        >
                          {faq.CONTENT}
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
                            onClick={() => handleDelete(faq.FAQ_NO)}
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
          ) : (
            <p className="text-center mt-4">등록된 FAQ가 없습니다.</p>
          )}
        </Container>

        {/* 페이지네이션 */}
        {faqData.length > 0 && (
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
      </div>
    </Container>
  );
}
