import React, { useState, useRef } from 'react';
import { Button, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Regist.css';
import HorizonLine from './HorizonLine';

export default function Regist() {
  const navigate = useNavigate();
  const content = useRef();
  const title = useRef();
  const ratingRef = useRef();
  const file_image = useRef();

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

  const [imageUrl, setImageUrl] = useState();

  const loadImg = (event) => {
    let value = event.target.files[0];
    setImageUrl(value);
    console.log(value);
    console.log(imageUrl);
  };

  return (
    <Container>
      <div className="review_register">
        <div className="board">
          <div className="review_title">
            <p style={{ fontSize: '25px' }}>
              <b>리뷰 작성하기</b>
              <div>
                <span className="meetingsName">
                  {completedMeetings[0].name}
                </span>
              </div>
            </p>
          </div>
          <HorizonLine />
          <div className="register_title">
            <div className="board">
              <p style={{ fontSize: '20px' }}>
                <input
                  type="text"
                  className="review_input_title mt-4"
                  placeholder="제목"
                  ref={title}
                />
              </p>
              <div className="writer mb-3">
                <span>문정배</span>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <select
                  name="rating"
                  id="review_rating"
                  ref={ratingRef}
                  defaultValue={5}
                >
                  <option value="1">★☆☆☆☆</option>
                  <option value="2">★★☆☆☆</option>
                  <option value="3">★★★☆☆</option>
                  <option value="4">★★★★☆</option>
                  <option value="5">★★★★★</option>
                </select>
              </div>
            </div>
            <div className="register_body">
              <div className="mb-2 mt-2">
                <label htmlFor="content" className="mb-3">
                  <textarea
                    className="form-control content"
                    cols="200"
                    rows="10"
                    id="review_content"
                    name="text"
                    placeholder="내용작성"
                    ref={content}
                  ></textarea>
                </label>
              </div>
              <div className="d-flex  justify-content-between align-items-center">
                <div className="review_register_button  mb-3">
                  <input
                    type="file"
                    className="file"
                    onChange={(e) => loadImg(e)}
                  />
                </div>
                <div>
                  <Button
                    className="review_register_btn ms-3 justify-content-end me-2"
                    onClick={async () => {
                      const formData = new FormData();
                      formData.append('file', imageUrl);
                      formData.append('title', title.current.value);
                      formData.append('content', content.current.value);
                      formData.append('star', ratingRef.current.value); // 예시로 5점

                      try {
                        const response = await fetch(
                          'http://localhost:8080/review/insert',
                          {
                            method: 'POST',
                            body: formData,
                          }
                        ).then(() => {
                          navigate('/review');
                        });

                        if (!response.ok) {
                          const errorData = await response.text(); // 오류 메시지 텍스트 받기
                          console.error('서버 오류:', errorData);
                        } else {
                          const data = await response.json();
                          console.log('파일 업로드 성공', data);
                        }
                      } catch (error) {
                        console.error('파일 업로드 실패:', error);
                      }
                    }}
                  >
                    작성
                  </Button>
                  <Button
                    className="review_register_btn"
                    onClick={() => {
                      navigate('/review');
                    }}
                  >
                    목록
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
