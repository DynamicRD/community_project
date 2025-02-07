import React, { useEffect, useState } from 'react';
import './GroupRegist.css';
import { Button, Col, Collapse, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function GroupUpdate() {
  const [open, setOpen] = useState(false);

  const {g_title,setG_title} = useState();
  const {type,setType} = useState();
  const {category,setCategory} = useState();
  const {user_max, setUser_max} = useState();
  const {price, setPrice} = useState();
  const {address, setAddress} = useState();
  const {detail_address, setDetail_address} = useState();
  const {lat, setLat} = useState();
  const {alt, setAlt} = useState();
  const {start_date, setStart_date} = useState();
  const {last_date, setLast_date} = useState();
  const {comment1, setComment1} = useState();
  const {comment2, setComment2} = useState();
  const {img_url, setImg_url} = useState();

  return (
    <Container>
      <div className="group_regist">
        <div className="board">
          <div className="review_title">
            <p style={{ fontSize: '25px' }}>
              <b>모임 정보 수정</b>
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
                  value={type}
                  onChange={(e) => setType(e.target.value)} 
                >
                  <option value="regular">정기모임</option>
                  <option value="one">동행,소모임</option>
                </Form.Select>
                <Form.Label className="mt-3">모임 카테고리</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="w-50"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} 
                >
                  <option value="culture">문화/예술</option>
                  <option value="food">푸드/드링크</option>
                  <option value="hobby">취미</option>
                  <option value="travel">여행</option>
                  <option value="edu">교육</option>
                </Form.Select>
                <Form.Label className="mt-3">모임명</Form.Label>
                <Form.Control type="text" className="w-50" ref={g_title} value='모임' onChange={(e) => setG_title(e.target.value)} />
                <div className="d-flex flex-row">
                  <div className="mt-3">
                    <Form.Label>모임정원</Form.Label>
                    <Form.Control
                      type="number"
                      className="w-50"
                      value={user_max}
                      onChange={(e) => setUser_max(e.target.value)} 
                    />
                  </div>
                  <div className="mt-3">
                    <Form.Label>인당 비용</Form.Label>
                    <Form.Control type="number" className="w-75" ref={price} 
                    value={price} onChange={(e) => setPrice(e.target.value)}/>
                  </div>
                </div>
                <div className="d-flex flex-row mt-3">
                  <div className="me-5">
                    <Form.Label>모임시작일</Form.Label>
                    <Form.Control type="datetime-local" ref={start_date} value={start_date} onChange={(e) => setStart_date(e.target.value)}/>
                  </div>
                  <div>
                    <Form.Label>모임종료일</Form.Label>
                    <Form.Control type="datetime-local" ref={last_date} value={last_date} onChange={(e) => setLast_date(e.target.value)}/>
                  </div>
                </div>
                {/* 주소 입력 */}
                <Form.Group as={Row} className="mt-4 mb-3">
                  <Form.Label column sm={2}>
                    모임주소
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} size="50" />
                  </Col>
                  <Col sm={5}>
                  {/* 버튼 클릭하면 지도 api */}
                    <Button
                      onClick={() => {
                        // const mapForm = new FormData();
                        // mapForm.append('address', address.current.value);
                        // fetch('http://localhost:8080/group/map',{
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
                      map
                      {/* map 리턴해서 받아오기 */}
                    </div>
                  </Collapse>
                </Form.Group>
                {/* 상세주소 입력 */}
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    상세주소
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" ref={detail_address} size="30" value={detail_address} onChange={(e) => setDetail_address(e.target.value)}/>
                  </Col>
                </Form.Group>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="mt-3">모임장 한마디</Form.Label>
                <Form.Control as="textarea" rows={3} value={comment1} onChange={(e) => setComment1(e.target.value)} />
                <Form.Label className="mt-3">모임 소개글</Form.Label>
                <Form.Control as="textarea" rows={5} value={comment2} onChange={(e) => setComment2(e.target.value)} />
              </Form.Group>
            </Form>

            <div className="register_body">
              <div className="d-flex  justify-content-between align-items-end">
                <div className="register_button">
                  <p>모임 대표 이미지 등록</p>
                  <input type="file" value={img_url} onChange={(e) => setImg_url(e.target.value)}/>
                </div>
                <div>
                  <Button
                    className="register_btn ms-3 justify-content-end"
                    onClick={() => {
                      if (confirm('수정하시겠습니까?')) {
                        const form = new FormData();
                        form.append('g_title', g_title.current.value);
                        form.append('type', type.current.value);
                        form.append('category', category.current.value);
                        form.append('user_max', user_max.current.value);
                        form.append('price', price.current.value);
                        form.append('address', address.current.value);
                        form.append('detail_address', detail_address.current.value);
                        // 주소 위도경도
                        form.append('lat', lat.current.value);
                        form.append('alt', alt.current.value);
                        form.append('start_date', start_date.current.value);
                        form.append('last_date', last_date.current.value);
                        form.append('comment1', comment1.current.value);
                        form.append('comment2', comment2.current.value);
                        if(img_url.current.files.length>0){
                          form.append('img_url', img_url.current.files[0]);
                        }
                        fetch('http://localhost:8080/group/update', {
                          method: 'post',
                          encType: 'multipart/form-data',
                          body: form,
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
