import React, { useEffect, useRef } from 'react';
import './GroupRegist.css';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export default function GroupRegist() {
  const navigate = useNavigate();
  const g_title = useRef();
  const type = useRef();
  const category = useRef();
  const user_max = useRef();
  const price = useRef();
  const area = useRef();
  const address = useRef();
  const detail_address = useRef();
  const start_date = useRef();
  const last_date = useRef();
  const comment1 = useRef();
  const comment2 = useRef();
  const img_url = useRef();

  useEffect(() => {
    // Daum Postcode API 로드
    const scriptPostcode = document.createElement('script');
    scriptPostcode.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    scriptPostcode.async = true;
    document.body.appendChild(scriptPostcode);

    // jQuery 로드
    const scriptJQuery = document.createElement('script');
    scriptJQuery.src = '/js/jquery-1.11.3.min.js';
    scriptJQuery.async = true;
    document.body.appendChild(scriptJQuery);

    // popup_2.js 로드
    const scriptPopup = document.createElement('script');
    scriptPopup.src = '/javascript/popup_2.js';
    scriptPopup.async = true;
    document.body.appendChild(scriptPopup);

    // 컴포넌트가 언마운트될 때 스크립트 제거 (메모리 누수 방지)
    return () => {
      document.body.removeChild(scriptPostcode);
      document.body.removeChild(scriptJQuery);
      document.body.removeChild(scriptPopup);
    };
  }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때만 실행되도록 함

  const sample6_execDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        // 주소 검색 후 처리
        console.log(data);
      }
    }).open();
  };

  return (
    <Container>
      <div className="group_register">
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
                <Form.Label>모임 카테고리</Form.Label>
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
                <Form.Label>모임명</Form.Label>
                <Form.Control type="text" className="w-50" ref={g_title} />
                <div className="d-flex flex-row">
                  <div>
                    <Form.Label>모임정원</Form.Label>
                    <Form.Control
                      type="number"
                      className="w-50"
                      ref={user_max}
                    />
                  </div>
                  <div>
                    <Form.Label>인당 비용</Form.Label>
                    <Form.Control type="number" className="w-75" ref={price} />
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="me-5">
                    <Form.Label>모임시작일</Form.Label>
                    <Form.Control type="date" ref={start_date} />
                  </div>
                  <div>
                    <Form.Label>모임종료일</Form.Label>
                    <Form.Control type="date" ref={last_date} />
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="me-5">
                    <Form.Label>모임 주소</Form.Label>
                    <div className='d-flex' >
                    <Form.Control type="text" ref={start_date} placeholder='우편번호 입력'id='sample6_postcode'/>
                    <Button onClick={sample6_execDaumPostcode}>찾기</Button>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <div className="me-5">
                  <Form.Control type="text" ref={address} id="sample6_address" placeholder='주소' className='w-50'/>
                  <Form.Control type="text" ref={detail_address} id="sample6_detailAddress" placeholder='상세주소' className='w-50'/>
                    <input
                      type="text"
                      id="sample6_postcode"
                      placeholder="우편번호"
                    />
                    <input
                      type="button"
                      onClick={sample6_execDaumPostcode}
                      value="우편번호 찾기"
                    />
                    <br />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="sample6_address"
                      placeholder="주소"
                    />
                    <br />
                    <input
                      type="text"
                      id="sample6_detailAddress"
                      placeholder="상세주소"
                    />
                  </div>
                </div>
                {/* <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
                <script
                  type="text/javascript"
                  src="/js/jquery-1.11.3.min.js"
                ></script>
                <script src="/javascript/popup_2.js"></script> */}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>모임장 한마디</Form.Label>
                <Form.Control as="textarea" rows={3} ref={comment1} />
                <Form.Label>모임 소개글</Form.Label>
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
                      navigate('/group/GroupList');
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
