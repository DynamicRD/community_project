import React, { useEffect, useRef, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import './Announcements_notice.css';
import HorizonLine_table from './HorizonLine_table';
import Pagination from 'react-bootstrap/Pagination';
import { Link, useNavigate } from 'react-router';

let item = [];
for (let number = 1; number <= 5; number++) {
  item.push(
    <Pagination.Item key={number} active={number === 1}>
      {number}
    </Pagination.Item>
  );
}

export default function Announcements_notice() {
  const [noticeList, setNoticeList] = useState([]);
  //공지사항 값 DB에서 가져오기
  function getList(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNoticeList(data);
        console.log(data);
      });
  }

  //페이지 시작 시 getList 호출
  useEffect(() => {
    getList('http://localhost:8080/announcements/notice/list');
  }, []);

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
            <div
              className="ms-5 mb-3"
              style={{ fontFamily: 'Freesentation-9Black' }}
            >
              {noticeList.length}개 공지사항
            </div>
            {noticeList.length <= 0 ? (
              <div
                className="ms-5 mb-3"
                style={{ fontFamily: 'Freesentation-9Black' }}
              >
                공지사항이 없습니다.
              </div>
            ) : (
              noticeList.map((object) => (
                <tbody key={object.NOTICE_NO}>
                  <tr>
                    <td className="table_td_title">
                      <Nav.Link
                        href={`/announcements/notice/read/${object.NOTICE_NO}`}
                      >
                        <span style={{ display: 'block' }} className="ps-5 p-3">
                          {object.NOTICE_TITLE}
                        </span>
                      </Nav.Link>
                    </td>
                    <td className="table_td_date">
                      <span className="pe-5">{object.REG_DATE}</span>
                    </td>
                  </tr>
                  <HorizonLine_table />
                </tbody>
              ))
            )}
          </table>
        </Container>
        <div className="d-flex justify-content-center align-content-center mt-4">
          <Pagination size="sm">{item}</Pagination>
        </div>
      </div>
    </Container>
  );
}
