import React, { useEffect, useRef, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import './Announcements_notice.css';
import { useNavigate } from 'react-router';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      });
  }, []);
  return [data, loading];
}

export default function Announcements_notice_read() {
  const paths = window.location.href.split('/');

  const url =
    'http://localhost:8080/announcements/' +
    paths[paths.length - 3] +
    '/' +
    paths[paths.length - 2] +
    '/' +
    paths[paths.length - 1];

  const [data, loading] = useFetch(url);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <>
        <Container>
          <div className="notice_read">
            <div className="notice_head d-flex flex-column justify-content-between">
              <span className="notice_title mb-3">{data.NOTICE_TITLE}</span>
              <span className="notice_date mb-4">{data.REG_DATE}</span>
              <span className="notice_hr mb-5"></span>
            </div>
            <span className="notice_content ms-4 me-2">{data.CONTENT}</span>
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
}
