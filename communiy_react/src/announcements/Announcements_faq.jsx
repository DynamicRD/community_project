import React from 'react';
import './Announcements_faq.css';
import { Container, Nav, Pagination } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

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
export default function Announcements_notice() {
  let item = [];
  for (let number = 1; number <= 5; number++) {
    item.push(
      <Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Container class="d-flex justify-content-center">
      <div className="m-5">
        <div className=" d-flex m-5">
          <Nav.Link href="/user/announcements">
            <span className="nav_notice" style={{ fontSize: '33px' }}>
              공지사항&nbsp;&nbsp;&nbsp;|
            </span>
          </Nav.Link>
          <Nav.Link href="/user/announcements/faq">
            <span className="nav_notice" style={{ fontSize: '33px' }}>
              &nbsp;&nbsp;&nbsp;FAQ
            </span>
          </Nav.Link>
        </div>
        <Container>
          <Accordion defaultActiveKey="0">
            {announcementData.map((object) => (
              <Accordion.Item
                eventKey={object.no}
                flush
                key={object.no}
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
                    {object.title}
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <span
                    className="faq_accordion_body "
                    style={{
                      width: '1100px',
                    }}
                  >
                    {object.content}
                  </span>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </div>
      <div className="d-flex justify-content-center align-content-center mb-4 mt-4">
        <Pagination size="sm">{item}</Pagination>
      </div>
    </Container>
  );
}
