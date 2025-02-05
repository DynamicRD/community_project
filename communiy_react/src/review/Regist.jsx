import React, { useState, useRef } from 'react';
import { Button, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Regist.css';
import HorizonLine from './HorizonLine';

export default function Regist() {
  const navigate = useNavigate();
  const content = useRef();
  const title = useRef();
  const selectRef = useRef();
  const ratingRef = useRef();

  return (
    <Container>
      <div className="review_register">
        <div className="board">
          <div className="review_title">
            <p style={{ fontSize: '25px' }}>
              <b>리뷰 작성하기</b>
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
                  name="category"
                  id="review_review_category"
                  ref={selectRef}
                >
                  <option value="culture">문화/예술</option>
                  <option value="food">푸드/드링크</option>
                  <option value="hobby">취미</option>
                  <option value="travel">여행</option>
                  <option value="edu">교육</option>
                </select>
              </div>
              <div>
                <select
                  name="rating"
                  id="review_rating"
                  className="text-center"
                  ref={ratingRef}
                >
                  <option value="0">☆☆☆☆☆</option>
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
                  <input type="file" className="file" />
                </div>
                <div>
                  <Button
                    className="review_register_btn ms-3 justify-content-end"
                    onClick={() => {
                      const form = new FormData();
                      form.append('category', selectRef.current.value);
                      form.append('title', title.current.value);
                      form.append('content', content.current.value);
                      form.append('star', ratingRef.current.value);
                      fetch('http://localhost:8080/review/insert', {
                        method: 'post',
                        body: form,
                      }).then(() => {
                        navigate('/review');
                      });
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
