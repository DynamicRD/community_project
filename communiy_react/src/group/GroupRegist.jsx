import React, { useEffect, useRef, useState } from 'react';
import './GroupRegist.css';
import { Button, Col, Collapse, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export default function GroupRegist() {
  const g_title = useRef();
  const type = useRef();
  const category = useRef();
  const user_max = useRef();
  const price = useRef();
  const addr2 = useRef();
  const start_date = useRef();
  const last_date = useRef();
  const [comment1, setComment1] = useState('');
  const handleComment1Change = (e) => setComment1(e.target.value);
  const comment2 = useRef();
  const img_url1 = useRef();
  const img_url2 = useRef();
  const img_url3 = useRef();
  const [form, setForm] = useState(new FormData());

  /**  Google Places API 자동완성 설정 */
  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);

  const [formData, setFormData] = useState({
    location: '',
    coordinates: { lat: null, lng: null },
    placeId: '',
  });

  useEffect(() => {
    if (!window.google) return;

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
    autoCompleteRef.current.addListener('place_changed', () => {
      const place = autoCompleteRef.current.getPlace();
      if (place.geometry) {
        setFormData((prev) => ({
          ...prev,
          location: place.formatted_address,
          coordinates: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          placeId: place.place_id,
        }));
      }
    });
  }, []);

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
                    <Form.Control type="number" className="w-75" ref={price} />
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
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      ref={inputRef}
                      placeholder="모임 장소를 검색하세요"
                      size="50"
                    />
                  </Col>
                </Form.Group>
                {/* 상세주소 입력 */}
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    상세주소
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" ref={addr2} size="30" />
                  </Col>
                </Form.Group>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="mt-3">모임장 한마디</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment1}
                  onChange={handleComment1Change}
                />
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
                        form.append('g_title', g_title.current.value);
                        form.append('type', type.current.value);
                        form.append('category', category.current.value);
                        form.append('user_max', Number(user_max.current.value));
                        form.append('price', Number(price.current.value));
                        form.append('addr1', formData.location);
                        form.append('addr2', addr2.current.value);
                        form.append(
                          'latitude',
                          Number(formData.coordinates.lat)
                        );
                        form.append(
                          'longitude',
                          Number(formData.coordinates.lng)
                        );
                        form.append('placeId', formData.placeId);
                        const date1 = new Date(start_date.current.value);
                        const formattedStartDate = date1.toISOString();
                        form.append('start_date', formattedStartDate);

                        const date2 = new Date(last_date.current.value);
                        const formattedLastDate = date2.toISOString();
                        form.append('last_date', formattedLastDate);
                        form.append('comment1', comment1);
                        form.append('comment2', comment2.current.value);
                        // if (img_url1.current.files.length > 0) {
                        //   form.append('img_url1', img_url1.current.files[0]);
                        // }
                        // if (img_url2.current.files.length > 0) {
                        //   form.append('img_url2', img_url2.current.files[0]);
                        // }
                        // if (img_url3.current.files.length > 0) {
                        //   form.append('img_url3', img_url3.current.files[0]);
                        // }
                        fetch('http://localhost:8080/group/insert', {
                          method: 'post',
                          // encType: 'multipart/form-data',
                          body: form,
                        }).then(() => {
                          alert(
                            '신청이 완료되었습니다. 관리자의 승인 후 모임이 개설됩니다.'
                          );
                          history.go(-1);
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
