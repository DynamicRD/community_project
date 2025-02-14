import React, { useEffect, useState } from 'react';
import { Button, Container, Nav } from 'react-bootstrap';

import './Read.css';
import HorizonLine from './HorizonLine';
import { useNavigate } from 'react-router';

function useFetch(url) {
  const [reviewDetail, setReviewDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReviewDetail(data);
        console.log(data);
      });
  }, []);
  return [reviewDetail, loading];
}

export default function Read() {
  const paths = window.location.href.split('/');

  const url =
    'http://localhost:8080/review/' +
    paths[paths.length - 2] +
    '/' +
    paths[paths.length - 1];

  const [reviewDetail, loading] = useFetch(url);

  const navigate = useNavigate();
  const [content, setContent] = useState();
  const onChangeTextArea = (e) => {
    setContent(e.target.value);
  };
  const count = 30;

  const getStarImages = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '/images/star.png' : '/images/emptyStar.png');
    }
    return stars;
  };
  const completedMeetings = [
    {
      name: '테크 세미나',
      date: '2025-01-10',
      endDate: '2025-01-10',
      role: '참석자',
      cost: '₩ 30,000',
    },
    {
      name: '사진 동아리',
      date: '2025-01-15',
      endDate: '2025-01-15',
      role: '모임장',
      cost: '₩ 20,000',
    },
    {
      name: '사진 동아리',
      date: '2025-01-15',
      endDate: '2025-01-15',
      role: '모임장',
      cost: '₩ 20,000',
    },
    {
      name: '사진 동아리',
      date: '2025-01-15',
      endDate: '2025-01-15',
      role: '모임장',
      cost: '₩ 20,000',
    },
  ];

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

  if (!reviewDetail) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <div className="review_header">
          <div className="review_title">
            <p style={{ fontSize: '33px' }}>
              <b>{reviewDetail.R_TITLE}</b>
              <span
                style={{ fontSize: '13px' }}
                className="mt-2 ms-2 text-black-50"
              >
                {completedMeetings[0].name}
              </span>
            </p>

            <div className="review_writer ms-2">
              <span>{reviewDetail.R_ID}</span>
              <span> 조회수 : {count}</span>
            </div>
          </div>
          <HorizonLine />
          <div className="review_body ">
            <div className="d-flex justify-content-between m-3">
              <Nav.Link href="/review" className="reviewBoardLink">
                {'>'} 리뷰게시판
              </Nav.Link>
              <span style={{ fontSize: '12px' }}>
                평점&nbsp;:&nbsp;
                {getStarImages(reviewDetail.STAR).map((star, index) => (
                  <img key={index} src={star} alt="star" className="star" />
                ))}
              </span>
            </div>
            <div className="review_image">
              <img
                src={`data:image/jpeg;base64,${reviewDetail.IMG_URL}`}
                alt="detail"
                className="review_image mb-4"
              />
            </div>
            <div className="review_main">{reviewDetail.CONTENT}</div>
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
                  2025-02-13
                </p>
              </div>
              <HorizonLine />
            </Container>
          ))}
        </div>
      </Container>
    );
  }
}
