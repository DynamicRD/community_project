import React from 'react';
import './Announcements_faq.css';
import { Container, Nav, Pagination } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

export default function Announcements_notice({ announcementData }) {
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
          <Nav.Link href="/announcements">
            <span className="nav_notice" style={{ fontSize: '33px' }}>
              공지사항&nbsp;&nbsp;&nbsp;|
            </span>
          </Nav.Link>
          <Nav.Link href="/announcements/faq">
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
