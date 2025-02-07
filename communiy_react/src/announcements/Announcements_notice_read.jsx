import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import './Announcements_notice.css';

export default function Announcements_notice_read({ announcementData }) {
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
