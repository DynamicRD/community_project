import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '/src/announcements/Announcements_notice.css';
import { Link } from 'react-router-dom';

export default function NoticeDetail() {
  const { noticeid } = useParams(); // ✅ useParams를 함수 내부에서 사용
  const noticeId = parseInt(noticeid, 10); // ✅ 문자열을 숫자로 변환

  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  // 공지사항 데이터
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
      content: '문정배 최고라고 생각합니다2',
      date: formattedDate,
    },
    {
      no: 3,
      title: '문정배에 대한 고찰',
      content: '문정배 최고라고 생각합니다3',
      date: formattedDate,
    },
  ];

  // ✅ noticeId가 유효한 범위인지 확인
  if (!announcementData[noticeId - 1]) {
    return (
      <Container>
        <h2>존재하지 않는 공지사항입니다.</h2>
      </Container>
    );
  }

  const notice = announcementData[noticeId - 1]; // ✅ 인덱스 조정 (배열은 0부터 시작)

  return (
    <>
      <Container>
        <div className="notice_read">
          <div className="notice_head d-flex flex-column justify-content-between">
            <span className="notice_title mb-3">{notice.title}</span>
            <span className="notice_date mb-4">{notice.date}</span>
            <span className="notice_hr mb-5"></span>
          </div>
          <span className="notice_content ms-4 me-2">{notice.content}</span>
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
          <Link to={'/admin/board/Notice'}>
            <span>목록으로</span>
          </Link>
        </div>
      </Container>
    </>
  );
}
