import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import './Announcements_notice.css';
import HorizonLine_table from './HorizonLine_table';
import Pagination from 'react-bootstrap/Pagination';

export default function Announcements_notice() {
  let item = [];
  for (let number = 1; number <= 5; number++) {
    item.push(
      <Pagination.Item key={number} active={number === 1}>
        {number}
      </Pagination.Item>
    );
  }

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

  return (
    // 카테고리 적용 고민
    <Container>
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
