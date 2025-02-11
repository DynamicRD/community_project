import React, { useEffect, useRef, useState } from 'react';
import './GroupRegist.css';
import { Button, Col, Collapse, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import GoogleMap from './component/GoogleMap';

export default function GroupRegist() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const g_title = useRef();
  const type = useRef();
  const category = useRef();
  const user_max = useRef();
  const price = useRef();
  const address = useRef();
  const detail_address = useRef();
  const lat = useRef();
  const alt = useRef();
  const start_date = useRef();
  const last_date = useRef();
  const comment1 = useRef();
  const comment2 = useRef();
  const img_url1 = useRef();
  const img_url2 = useRef();
  const img_url3 = useRef();
  let loading = false;

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <Container className="w-75">
        <div className="group_regist">
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
                      <Form.Control
                        type="number"
                        className="w-75"
                        ref={price}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row mt-3">
                    <div className="me-5">
                      <Form.Label>모임시작일</Form.Label>
                      <Form.Control type="datetime-local" ref={start_date} />
                    </div>
                    <div>
                      <Form.Label>모임종료일</Form.Label>
                      <Form.Control type="datetime-local" ref={last_date} />
                    </div>
                  </div>
                  {/* 주소 입력 */}
                  <Form.Group as={Row} className="mt-4 mb-3">
                    <Form.Label column sm={2}>
                      모임주소
                    </Form.Label>
                    <Col sm={5}>
                      <Form.Control
                        type="text"
                        ref={address}
                        size="50"
                        placeholder="도로명주소 또는 건물이름 입력"
                      />
                    </Col>
                    <Col sm={5}>
                      <Button
                        onClick={() => {
                          // const mapForm = new FormData();
                          // mapForm.append('address', address.current.value);
                          // fetch('http://localhost:8080/group/insert',{
                          //   method:'post',
                          //   body: mapForm,
                          // }).then((response)=>{
                          //    return response.json();
                          setOpen(!open);
                          // })
                        }}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                      >
                        찾기
                      </Button>
                    </Col>
                    <Collapse in={open}>
                      <div>
                        {/* map 리턴해서 받아오기 */}
                        <GoogleMap />
                      </div>
                    </Collapse>
                  </Form.Group>
                  {/* 상세주소 입력 */}
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      상세주소
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        ref={detail_address}
                        size="30"
                      />
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
                <div className="d-flex  justify-content-between align-items-end">
                  <div className="register_button">
                    <p>모임 대표 이미지 등록</p>
                    <input type="file" ref={img_url1} className="mb-3" />
                    <p>모임 상세 이미지 등록</p>
                    <input type="file" ref={img_url2} />
                    <input type="file" ref={img_url3} />
                  </div>
                  <div>
                    <Button
                      className="register_btn ms-3 justify-content-end"
                      onClick={() => {
                        if (confirm('신청하시겠습니까?')) {
                          const form = new FormData();
                          form.append('g_title', g_title.current.value);
                          form.append('type', type.current.value);
                          form.append('category', category.current.value);
                          form.append('user_max', user_max.current.value);
                          form.append('price', price.current.value);
                          form.append('address', address.current.value);
                          form.append(
                            'detail_address',
                            detail_address.current.value
                          );
                          form.append('lat', lat.current.value);
                          form.append('alt', alt.current.value);
                          form.append('start_date', start_date.current.value);
                          form.append('last_date', last_date.current.value);
                          form.append('comment1', comment1.current.value);
                          form.append('comment2', comment2.current.value);
                          if (img_url1.current.files.length > 0) {
                            form.append('img_url1', img_url1.current.files[0]);
                          }
                          if (img_url2.current.files.length > 0) {
                            form.append('img_url2', img_url2.current.files[0]);
                          }
                          if (img_url3.current.files.length > 0) {
                            form.append('img_url3', img_url3.current.files[0]);
                          }
                          fetch('http://localhost:8080/group/insert', {
                            method: 'post',
                            encType: 'multipart/form-data',
                            body: form,
                          }).then(() => {
                            alert('신청이 완료되었습니다.');
                            navigate('/group/list');
                          });
                        }
                      }}
                    >
                      신청하기
                    </Button>
                    <Button
                      className="register_btn ms-3 justify-content-end"
                      onClick={() => {
                        history.go(-1);
                        // navigate('/group/list');
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
}
