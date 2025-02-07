import React, { useState } from 'react';
import { Button, Container, Nav } from 'react-bootstrap';

import './Read.css';
import HorizonLine from './HorizonLine';
import { useNavigate } from 'react-router';

export default function Read({ reviewData }) {
  const navigate = useNavigate();
  const [content, setContent] = useState();
  const onChangeTextArea = (e) => {
    setContent(e.target.value);
  };
  const today = new Date();
  const count = 30;

  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  const replyList = [
    {
      reply_title: '문정배1',
      reply_content: '문정배 최고1',
    },
    {
      reply_title: '문정배2',
      reply_content: '문정배 최고2',
    },
    {
      reply_title: '문정배3',
      reply_content: '문정배 최고3',
    },
    {
      reply_title: '문정배4',
      reply_content: '문정배 최고4',
    },
  ];

  return (
    <Container>
      <div className="review_header">
        <div className="review_title">
          <p style={{ fontSize: '25px' }}>
            <b>{reviewData[0].title}</b>
          </p>
          <div className="review_writer">
            <span>{reviewData[0].writer}</span>
            <span> 조회수 : {count}</span>
          </div>
        </div>
        <HorizonLine />
        <div className="review_body ">
          <Nav.Link href="/review" className="reviewBoardLink m-3">
            {'>'} 리뷰게시판
          </Nav.Link>
          <div className="review_image">
            <img
              src={reviewData[0].img}
              alt="detail"
              className="review_image mb-4"
            />
          </div>
          <div className="review_main">{reviewData[0].content}</div>
          <div className="review_list">
            <Nav.Link href="/review">
              <span>목록</span>
            </Nav.Link>
          </div>
        </div>

        <div className="mt-3">
          <form action="#">
            <div className="mb-2 mt-3">
              <Container>
                <div className="d-flex flex-column justify-content-between">
                  <span className="reply_hr mt-3 mb-3"></span>
                </div>
              </Container>
              <label htmlFor="comment" className="mb-3 ms-2">
                댓글
              </label>
              <textarea
                className="form-control"
                rows="5"
                id="comment"
                name="text"
                value={content}
                onChange={onChangeTextArea}
              ></textarea>
            </div>

            <Button
              className="register_btn ms-3"
              onClick={() => {
                const form = new FormData();
                form.append('content', content);
                fetch('http://localhost:8080/review/reply', {
                  method: 'post',
                  body: form,
                }).then(() => {
                  navigate('/review/Home');
                });
              }}
            >
              작성
            </Button>
          </form>
        </div>

        {/* reply */}

        {replyList.map((object, idx) => (
          <Container key={idx}>
            <div className="writer mt-4 mb-3">
              <span>
                <b>{object.reply_title}</b>
              </span>
            </div>
            <div className="review_content">
              <p className="m-1 review_p">{object.reply_content}</p>
              <p className="m-1 review_p" id="review_date">
                {formattedDate}
              </p>
            </div>
            <HorizonLine />
          </Container>
        ))}
      </div>
    </Container>
  );
}
