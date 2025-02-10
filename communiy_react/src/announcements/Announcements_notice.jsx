import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import './Announcements_notice.css';
import HorizonLine_table from './HorizonLine_table';
import Pagination from 'react-bootstrap/Pagination';

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
    // 카테고리 적용 고민
    <Container>
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
          <table className="announcements_table">
            {announcementData.map((object) => (
              <tbody key={object.no}>
                <tr>
                  <td className="table_td_title">
                    <Nav.Link href="/announcements/read">
                      <span className="ps-5">{object.title}</span>
                    </Nav.Link>
                  </td>
                  <td className="table_td_date">
                    <span className="pe-5">{object.date}</span>
                  </td>
                </tr>
                <HorizonLine_table />
              </tbody>
            ))}
          </table>
        </Container>
        <div className="d-flex justify-content-center align-content-center mt-4">
          <Pagination size="sm">{item}</Pagination>
        </div>
      </div>
    </Container>
  );
}
