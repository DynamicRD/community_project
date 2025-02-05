import React, { useEffect, useRef, useState } from 'react';
import './GroupRegist.css';
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export default function GroupRegist() {
  const navigate = useNavigate();

  const g_title = useRef();
  const type = useRef();
  const category = useRef();
  const user_max = useRef();
  const price = useRef();
  const address = useRef();
  const detail_address = useRef();
  const start_date = useRef();
  const last_date = useRef();
  const comment1 = useRef();
  const comment2 = useRef();
  const img_url = useRef();

  // 버튼 클릭 시 AddressInput 활성화/비활성화
  // const handleButtonClick = () => {
  //   // 주소 입력창을 토글하는 기능
  //   setIsAddressInputVisible((prevState) => !prevState);
  // };

  return (
    <Container>
      <div className="group_registe">
        <div className="board">
          <div className="review_title">
            <p style={{ fontSize: '25px' }}>
              <b>모임 개설 신청하기</b>
            </p>
          </div>
          <div className="group_register_form">
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>모임 타입</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="w-50"
                  ref={type}
                >
                  <option value="regular">정기모임</option>
                  <option value="one">동행,소모임</option>
                </Form.Select>
                <Form.Label className="mt-3">모임 카테고리</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="w-50"
                  ref={category}
                >
                  <option value="culture">문화/예술</option>
                  <option value="food">푸드/드링크</option>
                  <option value="hobby">취미</option>
                  <option value="travel">여행</option>
                  <option value="edu">교육</option>
                </Form.Select>
                <Form.Label className="mt-3">모임명</Form.Label>
                <Form.Control type="text" className="w-50" ref={g_title} />
                <div className="d-flex flex-row">
                  <div className="mt-3">
                    <Form.Label>모임정원</Form.Label>
                    <Form.Control
                      type="number"
                      className="w-50"
                      ref={user_max}
                    />
                  </div>
                  <div className="mt-3">
                    <Form.Label>인당 비용</Form.Label>
                    <Form.Control type="number" className="w-75" ref={price} />
                  </div>
                </div>
                <div className="d-flex flex-row mt-3">
                  <div className="me-5">
                    <Form.Label>모임시작일</Form.Label>
                    <Form.Control type="date" ref={start_date} />
                  </div>
                  <div>
                    <Form.Label>모임종료일</Form.Label>
                    <Form.Control type="date" ref={last_date} />
                  </div>
                </div>
                {/* 주소 입력 */}
                <Form.Group as={Row} className="mt-4 mb-3">
                  <Form.Label column sm={2}>
                    모임주소
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control type="text" name="address01" size="50" />
                  </Col>
                  <Col sm={5}>
                    <Button>찾기</Button>
                  </Col>
                </Form.Group>
                {/* 상세주소 입력 */}
                <Form.Group as={Row} >
                  <Form.Label column sm={2}>
                    상세주소
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" name="address02" size="30" />
                  </Col>
                </Form.Group>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="mt-3">모임장 한마디</Form.Label>
                <Form.Control as="textarea" rows={3} ref={comment1} />
                <Form.Label className="mt-3">모임 소개글</Form.Label>
                <Form.Control as="textarea" rows={5} ref={comment2} />
              </Form.Group>
            </Form>

            <div className="register_body">
              <div className="d-flex  justify-content-between">
                <div className="register_button">
                  <input type="file" className="file" />
                </div>
                <div>
                  <Button
                    className="register_btn ms-3 justify-content-end"
                    onClick={() => {
                      const form = new FormData();
                      // form.append('select', selectRef.current.value);
                      // form.append('title', title.current.value);
                      // form.append('content', content.current.value);
                      fetch('http://localhost:8080/review/insert', {
                        method: 'post',
                        body: form,
                      }).then(() => {
                        navigate('/review/Home');
                      });
                    }}
                  >
                    신청하기
                  </Button>
                  <Button
                    className="register_btn ms-3 justify-content-end"
                    onClick={() => {
                      navigate('/group/list');
                    }}
                  >
                    취소하기
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
