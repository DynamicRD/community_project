import React, { useState } from 'react';
import { Container, Nav, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import '/src/announcements/Announcements_notice.css';
import { Link } from 'react-router-dom';

export default function NoticeDetail() {
  const { noticeid } = useParams();
  const noticeId = parseInt(noticeid, 10);
  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  const [announcementData, setAnnouncementData] = useState([
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
  ]);

  const notice = announcementData.find((item) => item.no === noticeId) || {
    title: '',
    content: '',
    date: '',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(notice.title);
  const [editedContent, setEditedContent] = useState(notice.content);

  if (!notice.title) {
    return (
      <Container>
        <h2>존재하지 않는 공지사항입니다.</h2>
      </Container>
    );
  }

  const handleSave = () => {
    const updatedNotices = announcementData.map((item) =>
      item.no === noticeId
        ? { ...item, title: editedTitle, content: editedContent }
        : item
    );
    setAnnouncementData(updatedNotices);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updatedNotices = announcementData.filter(
        (item) => item.no !== noticeId
      );
      setAnnouncementData(updatedNotices);
      navigate('/admin/board/Notice');
    }
  };

  return (
    <>
      <Container>
        <div className="notice_read">
          <div className="notice_head d-flex flex-column justify-content-between">
            {isEditing ? (
              <Form.Control
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="mb-3"
              />
            ) : (
              <span className="notice_title mb-3">{notice.title}</span>
            )}
            <span className="notice_date mb-4">{notice.date}</span>
            <span className="notice_hr mb-5"></span>
          </div>
          {isEditing ? (
            <Form.Control
              as="textarea"
              rows={5}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="mb-3"
            />
          ) : (
            <span className="notice_content ms-4 me-2">{notice.content}</span>
          )}
        </div>
      </Container>
      <Container>
        <div className="notice_read2">
          <div className="notice_head2 d-flex flex-column justify-content-between">
            <span className="notice_hr2 mb-5"></span>
          </div>
        </div>
      </Container>
      <div className="btn_group">
        {isEditing ? (
          <Button
            className="btn_modify_remove"
            variant="success"
            onClick={handleSave}
          >
            저장
          </Button>
        ) : (
          <Button
            className="btn_modify_remove"
            variant="primary"
            onClick={() => setIsEditing(true)}
          >
            수정
          </Button>
        )}
        <Button
          className="btn_modify_remove"
          variant="danger"
          onClick={handleDelete}
        >
          삭제
        </Button>
      </div>
      <Container className="d-flex justify-content-center gap-3">
        <div className="notice_btn">
          <Link to={'/admin/board/Notice'} className="btn_list">
            <span>목록으로</span>
          </Link>
        </div>
      </Container>
    </>
  );
}
