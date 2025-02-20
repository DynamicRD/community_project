import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Container, Nav } from 'react-bootstrap';

import './Read.css';
import HorizonLine from './HorizonLine';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext'; //

function useFetch(url, urlPath) {
  const [replyList, setReplyList] = useState([]);
  const [reviewDetail, setReviewDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReviewDetail(data);
      })
      .catch((error) => {
        console.error('Error fetching review data:', error);
      })
      .finally(() => {
        setLoading(true);
      });

    fetch(urlPath)
      .then((response) => response.json())
      .then((data) => {
        setReplyList(data);
      })
      .catch((error) => {
        console.error('Error fetching reply data:', error);
      });
  }, []);
  return [reviewDetail, loading, replyList];
}

export default function Read() {
  const paths = window.location.href.split('/');
  const pathIdx = window.location.pathname.split('/').pop();
  const urlPath = 'http://localhost:8080/review/reply/list/' + pathIdx;
  const url =
    'http://localhost:8080/review/' +
    paths[paths.length - 2] +
    '/' +
    paths[paths.length - 1];

  const [reviewDetail, loading, replyList] = useFetch(url, urlPath);

  const navigate = useNavigate();
  const { isAuthenticated, userData } = useContext(AuthContext);

  const content = useRef();
  const count = 30;

  const getStarImages = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '/images/star.png' : '/images/emptyStar.png');
    }
    return stars;
  };

  if (reviewDetail === null) {
    return <Container>Loading...</Container>;
  } else {
    return (
      <Container>
        <div className="review_header">
          <div className="review_title">
            <p style={{ fontSize: '33px' }}>
              <b>{reviewDetail.REVIEW_TITLE}</b>
              <span
                style={{ fontSize: '13px' }}
                className="mt-2 ms-2 text-black-50"
              >
                {reviewDetail.GROUP_TITLE}
              </span>
            </p>

            <div className="review_writer ms-2">
              <span>{reviewDetail.NICKNAME}</span>
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
                src={`http://localhost:8080/upload/${reviewDetail.IMG_URL}`}
                alt="detail"
                className="review_image mb-4"
              />
            </div>
            <div className="review_main">{reviewDetail.CONTENT}</div>
            <div className="review_list d-flex">
              <Nav.Link href="/review">
                <span>목록</span>
              </Nav.Link>
              {reviewDetail.NO === userData?.no ? (
                <Nav.Link
                  onClick={() => {
                    const confirmValue = confirm('리뷰를 삭제하시겠습니까?');
                    if (confirmValue === true) {
                      fetch(
                        'http://localhost:8080/review/delete/' +
                          reviewDetail.REVIEW_NO
                      )
                        .then(() => {
                          alert('삭제가 완료 되었습니다');
                        })
                        .catch((error) => {
                          console.error('Error fetching review data:', error);
                        })
                        .finally(() => {
                          navigate('/review');
                        });
                    }
                  }}
                >
                  <span>삭제</span>
                </Nav.Link>
              ) : null}
            </div>
          </div>

          {!isAuthenticated ? (
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
                    ref={content}
                  ></textarea>
                </div>

                <Button
                  className="register_btn ms-3"
                  onClick={() => {
                    alert('로그인 후 작성 가능합니다');
                  }}
                >
                  작성
                </Button>
              </form>
            </div>
          ) : (
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
                    ref={content}
                  ></textarea>
                </div>

                <Button
                  variant="danger"
                  className="read_btn ms-2 mt-2"
                  onClick={() => {
                    const form = new FormData();
                    form.append('content', content.current.value);
                    form.append('userId', userData?.no);
                    form.append('userNickName', userData?.nickname);
                    form.append('reviewNo', reviewDetail.REVIEW_NO);
                    fetch('http://localhost:8080/review/reply/insert', {
                      method: 'post',
                      body: form,
                    }).then(() => {
                      window.location.reload();
                    });
                  }}
                >
                  작성
                </Button>
              </form>
            </div>
          )}

          {/* reply */}
          {replyList.length <= 0 ? (
            <Container>
              <div className="writer mt-4 mb-3">
                <span>작성된 댓글이 없습니다.</span>
              </div>
            </Container>
          ) : (
            replyList.map((object, idx = 0) => (
              <Container key={idx}>
                <div className="writer mt-4 mb-3">
                  <span style={{ fontSize: '17px' }}>
                    <b>{object.NICKNAME}</b>
                    {object.NO === userData?.no ? (
                      <>
                        <span
                          style={{ fontSize: '13px' }}
                          className="deleteReply ms-2"
                          onClick={() => {
                            fetch(
                              `http://localhost:8080/review/reply/delete/${object.COMMENT}`
                            )
                              .then(() => {
                                alert('삭제가 완료 되었습니다');
                              })
                              .catch((error) => {
                                console.error(
                                  'Error fetching review data:',
                                  error
                                );
                              })
                              .finally(() => {
                                window.location.reload();
                              });
                          }}
                        >
                          삭제
                        </span>
                      </>
                    ) : (
                      <>{null}</>
                    )}
                  </span>
                </div>
                <div className="review_content">
                  <p className="m-1 review_p">{object.CONTENT}</p>
                  <p className="m-1 review_p" id="review_date">
                    {object.REG_DATE}
                  </p>
                </div>
                <HorizonLine />
              </Container>
            ))
          )}
        </div>
      </Container>
    );
  }
}
