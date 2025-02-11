import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import './Announcements_notice.css';

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

export default function Announcements_notice_read() {
  return (
    <>
      <Container>
        <div className="notice_read">
          <div className="notice_head d-flex flex-column justify-content-between">
            <span className="notice_title mb-3">
              {announcementData[announcementData[1].no].title}
            </span>
            <span className="notice_date mb-4">
              {announcementData[announcementData[1].no].date}
            </span>
            <span className="notice_hr mb-5"></span>
          </div>
          <span className="notice_content ms-4 me-2">
            {announcementData[announcementData[1].no].content}
          </span>
        </div>
      </Container>
      <Container>
        <div className="notice_read2">
          <div className="notice_head2 d-flex flex-column justify-content-between">
            <span className="notice_hr2 mb-5"></span>
          </div>
        </div>
      </Container>
      <Container className="d-flex justify-content-center">
        <div className="notice_btn">
          <Nav.Link href="/announcements">
            <span>목록으로</span>
          </Nav.Link>
        </div>
      </Container>
    </>
  );
}