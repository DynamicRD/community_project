import React, { useEffect, useRef, useState } from 'react';
import './Announcements_faq.css';
import { Container, Form, Nav, Pagination } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

export default function Announcements_notice() {
  let item = [];
  for (let number = 1; number <= 5; number++) {
    item.push(
      <Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>
    );
  }

  const [FaqList, setFaqList] = useState([]);
  //공지사항 값 DB에서 가져오기
  function getList(url) {
    fetch(url)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setFaqList(data);
      });
  }

  //페이지 시작 시 getList 호출
  useEffect(() => {
    getList('http://localhost:8080/announcements/faq/list');
  }, []);

  return (
    <Container class="d-flex justify-content-center">
      <div className="m-5">
        <div className=" d-flex m-5">
          <Nav.Link href="/announcements">
            <span className="nav_notice" style={{ fontSize: '33px' }}>
              공지사항
            </span>
          </Nav.Link>
          <span className="nav_notice" style={{ fontSize: '33px' }}>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </span>
          <Nav.Link href="/announcements/faq">
            <span className="nav_notice" style={{ fontSize: '33px' }}>
              FAQ
            </span>
          </Nav.Link>
        </div>
        <Container>
          <Accordion defaultActiveKey="0">
            <div
              style={{ fontFamily: 'Freesentation-9Black' }}
              className="ms-5 mb-3"
            >
              {FaqList.length}개 자주묻는 질문
            </div>
            {FaqList.length === 0 ? (
              <div
                className="ms-5 mb-3"
                style={{ fontFamily: 'Freesentation-9Black' }}
              >
                FAQ내용이 없습니다.
              </div>
            ) : (
              FaqList.map((object, idx) => (
                <Accordion.Item
                  eventKey={idx}
                  flush
                  key={object.FAQ_NO}
                  className="mb-3"
                >
                  <Accordion.Header>
                    <span
                      className="faq_accordion_title"
                      style={{
                        width: '1100px',
                        height: '50px',
                      }}
                    >
                      {object.FAQ_TITLE}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <span
                      className="faq_accordion_body "
                      style={{
                        width: '1100px',
                      }}
                    >
                      {object.CONTENT}
                    </span>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            )}
          </Accordion>
        </Container>
      </div>
      <div className="d-flex justify-content-center align-content-center mb-4 mt-4">
        <Pagination size="sm">{item}</Pagination>
      </div>
    </Container>
  );
}
