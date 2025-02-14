import React, { useEffect, useState } from 'react';
import './GroupRegist.css';
import { Button, Col, Collapse, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import GoogleMap from './component/GoogleMap';
import { useLocation } from 'react-router';

export default function GroupUpdate() {
  const location = useLocation();

  // URL에서 쿼리 파라미터를 파싱
  const queryParams = new URLSearchParams(location.search);
  const g_id = queryParams.get('g_id'); // 'g_id' 파라미터 값을 가져옴
  const [items, setGroupDetail] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/group/detail?g_id=${g_id}`)
      .then((res) => res.json())
      .then((data) => {
        setGroupDetail(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [g_id]);

  const [formData, setFormData] = useState({
    g_title: '',
    type: '',
    category: '',
    user_max: '',
    price: '',
    addr1: '',
    addr2: '',
    lat: '',
    alt: '',
    start_date: '',
    last_date: '',
    comment1: '',
    comment2: '',
    img_url1: '',
    img_url2: '',
    img_url3: ''
  });

  useEffect(() => {
    if (items) {
      setFormData({
        g_title: items.G_TITLE || '',
        type: items.TYPE || '',
        category: items.CATEGORY || '',
        user_max: items.USER_MAX || '',
        price: items.PRICE || '',
        addr1: items.ADDR1 || '',
        addr2: items.ADDR2 || '',
        lat: items.LAT || '',
        alt: items.ALT || '',
        start_date: items.START_DATE || '',
        last_date: items.LAST_DATE || '',
        comment1: items.COMMENT1 || '',
        comment2: items.COMMENT2 || '',
        img_url1: items.IMG_URL1 || '',
        img_url2: items.IMG_URL2 || '',
        img_url3: items.IMG_URL3 || ''
      });
    }
    console.log("FormData category:", formData.category);
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Container className='w-75'>
      <h1>제목 {items.G_TITLE}</h1>
      <div className="group_regist">
        <div className="board">
          <div className="review_title">
            <p style={{ fontSize: '25px' }}>
              <b><span>{items.G_TITLE}</span> 모임 정보 수정</b>
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
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="regular">정기모임</option>
                  <option value="one">동행,소모임</option>
                </Form.Select>
                <Form.Label className="mt-3">모임 카테고리</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="w-50"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="culture">문화/예술</option>
                  <option value="food">푸드/드링크</option>
                  <option value="hobby">취미</option>
                  <option value="travel">여행</option>
                  <option value="edu">교육</option>
                </Form.Select>
                <Form.Label className="mt-3">모임명</Form.Label>
                <Form.Control
                  type="text"
                  className="w-50"
                  name="g_title"
                  value={formData.g_title}
                  onChange={handleChange}
                />
                <div className="d-flex flex-row">
                  <div className="mt-3">
                    <Form.Label>모임정원</Form.Label>
                    <Form.Control
                      type="number"
                      className="w-50"
                      name="user_max"
                      value={formData.user_max}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-3">
                    <Form.Label>인당 비용</Form.Label>
                    <Form.Control
                      type="number"
                      className="w-75"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row mt-3">
                  <div className="me-5">
                    <Form.Label>모임시작일</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Form.Label>모임종료일</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="last_date"
                      value={formData.last_date}
                      onChange={handleChange}
                    />
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
                      name="addr1"
                      value={formData.addr1}
                      onChange={handleChange}
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
                    <Form.Control
                      type="text"
                      name="addr2"
                      value={formData.addr2}
                      onChange={handleChange}
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
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="comment1"
                  value={formData.comment1}
                  onChange={handleChange}
                />
                <Form.Label className="mt-3">모임 소개글</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="comment2"
                  value={formData.comment2}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>

            <div className="register_body">
              <div className="d-flex  justify-content-between align-items-end">
                <div className="register_button">
                  <p>모임 대표 이미지 등록</p>
                  <input
                    type="file"
                    className="mb-3"
                    name="img_url1"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        img_url1: e.target.value
                      })
                    }
                  />
                  <p>모임 상세 이미지 등록</p>
                  <input
                    type="file"
                    name="img_url2"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        img_url2: e.target.value
                      })
                    }
                  />
                  <input
                    type="file"
                    name="img_url3"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        img_url3: e.target.value
                      })
                    }
                  />
                </div>
                <div>
                  <Button
                    className="register_btn ms-3 justify-content-end"
                    onClick={() => {
                      if (confirm('수정하시겠습니까?')) {
                        const form = new FormData();
                        for (const key in formData) {
                          form.append(key, formData[key]);
                        }
                        fetch('http://localhost:8080/group/update', {
                          method: 'post',
                          encType: 'multipart/form-data',
                          body: form
                        }).then(() => {
                          alert('수정이 완료되었습니다.');
                          // navigate(`/group/detail?${g_id}`);
                        });
                      }
                    }}
                  >
                    수정하기
                  </Button>
                  <Button
                    className="register_btn ms-3 justify-content-end"
                    onClick={() => {
                      history.go(-1);
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