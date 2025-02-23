import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './Announcements_notice.css';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return [data, loading, error];
}

export default function Announcements_notice_read() {
  const textareaRef = useRef(null);
  const paths = window.location.href.split('/');
  const url = `http://localhost:8080/announcements/${paths[paths.length - 3]}/${
    paths[paths.length - 2]
  }/${paths[paths.length - 1]}`;

  console.log('Fetching data from:', url); // URL 확인
  const [data, loading, error] = useFetch(url);

  useEffect(() => {
    if (textareaRef.current && data?.CONTENT) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data?.CONTENT]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;
  if (!data || !data.CONTENT) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <>
      <Container>
        <div className="notice_read">
          <div className="notice_head d-flex flex-column justify-content-between">
            <span className="notice_title mb-3">{data.NOTICE_TITLE}</span>
            <span className="notice_date mb-4">{data.REG_DATE}</span>
            <span className="notice_hr mb-5"></span>
          </div>
          <Form.Control
            as="textarea"
            value={data.CONTENT}
            readOnly
            ref={textareaRef}
            style={{
              border: 'none',
              height: 'auto',
              overflow: 'hidden',
              resize: 'none',
            }}
          />
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
