import React, { useContext, useEffect, useRef, useState } from 'react';
import './GroupRegist.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function GroupRegist() {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate
  const { isAuthenticated, userData } = useContext(AuthContext);  // 로그인 여부와 사용자 정보
  // 로그인되지 않았다면, 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!isAuthenticated) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login'); // 로그인 페이지로 이동
    }
  }, [isAuthenticated, navigate]);
  
  
  const group_title = useRef();
  const type = useRef();
  const category = useRef();
  const user_max = useRef();
  const price = useRef();
  const addr2 = useRef();
  const [area, setArea] = useState();
  const start_date = useRef();
  const last_date = useRef();
  const [comment1, setComment1] = useState('');
  const handleComment1Change = (e) => setComment1(e.target.value);
  const comment2 = useRef();

  // 이미지 업로드
  const [img_url1, setImg_url1] = useState(null);
  const [img_url2, setImg_url2] = useState(null);
  const [img_url3, setImg_url3] = useState(null);
  const [imgUrl1Preview, setImgUrl1Preview] = useState(null);
  const [imgUrl2Preview, setImgUrl2Preview] = useState(null);
  const [imgUrl3Preview, setImgUrl3Preview] = useState(null);

  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg_url1(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl1Preview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg_url2(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl2Preview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg_url3(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl3Preview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  //area 변환
  const areas = {
    서울: ['서울'],
    경기: ['경기', '경기도'],
    강원: ['강원', '강원도'],
    경상: ['경상', '경상도'],
    부산: ['부산', '부산광역시'],
    인천: ['인천', '인천광역시'],
    세종: ['세종'],
    대구: ['부산', '대구광역시'],
    광주: ['광주', '광주광역시'],
    대전: ['대전', '대전광역시'],
    울산: ['울산', '울산광역시'],
    전라: ['전라', '전라도'],
    충청: ['충청', '충청도'],
    제주: ['제주'],
  };

  function extractArea(location) {
    for (let [key, values] of Object.entries(areas)) {
      for (let value of values) {
        if (location.includes(value)) {
          return key; // 해당 지역이 포함되면 지역 이름 반환
        }
      }
    }
    return null; // 일치하는 지역이 없으면 null 반환
  }

  // area 상태가 업데이트될 때마다 실행되는 useEffect
  useEffect(() => {
    if (formData.location) {
      const extractedArea = extractArea(formData.location);
      setArea(extractedArea); // 지역 업데이트
      console.log('Extracted area: ', area); // 추출된 지역 확인
    }
  }, [formData.location]); // formData.location이 변경될 때마다 실행

  // 유효성 검사
  const handleStartDateChange = (e) => {
    const today = new Date();
    const threeDaysLater = new Date(today.setDate(today.getDate() + 3));
    const selectedStartDate = new Date(start_date.current.value);

    if (selectedStartDate < threeDaysLater) {
      alert('모임 시작일은 오늘부터 3일 후부터 가능합니다.');
      start_date.current.value = '';
      start_date.current.focus();
    }
  };

  const handleLastDateChange = (e) => {
    if (
      new Date(last_date.current.value) < new Date(start_date.current.value)
    ) {
      alert('모임 종료일은 모임 시작일보다 빠를 수 없습니다.');
      last_date.current.value = '';
      last_date.current.focus();
    }
  };

  const handleSubmit = () => {
    if (!group_title.current.value) {
      alert('모임명을 입력해주세요.');
      group_title.current.focus();
      return;
    }
    if (!type.current.value) {
      alert('모임 타입을 선택해주세요.');
      type.current.focus();
      return;
    }
    if (!category.current.value) {
      alert('모임 카테고리를 선택해주세요.');
      category.current.focus();
      return;
    }
    if (!user_max.current.value) {
      alert('모임 정원을 입력해주세요.');
      user_max.current.focus();
      return;
    }
    if (!price.current.value) {
      alert('인당 비용을 입력해주세요.');
      price.current.focus();
      return;
    }
    if (!formData.location) {
      alert('모임 주소를 입력해주세요.');
      inputRef.current.focus();
      return;
    }
    if (!start_date.current.value) {
      alert('모임 시작일을 입력해주세요.');
      start_date.current.focus();
      return;
    }
    if (!last_date.current.value) {
      alert('모임 종료일을 입력해주세요.');
      last_date.current.focus();
      return;
    }
    if (!comment1) {
      alert('모임장 한마디를 입력해주세요.');
      return;
    }
    if (!comment2.current.value) {
      alert('모임 소개글을 입력해주세요.');
      comment2.current.focus();
      return;
    }
    if (!img_url1) {
      alert('모임 대표 이미지를 등록해주세요.');
      return;
    }

    if (confirm('신청하시겠습니까?')) {
      const form = new FormData();
      form.append('no', userData.no);
      form.append('group_title', group_title.current.value);
      form.append('type', type.current.value);
      form.append('category', category.current.value);
      form.append('user_max', Number(user_max.current.value));
      form.append('price', Number(price.current.value));
      form.append('addr1', formData.location);
      form.append('addr2', addr2.current.value);
      form.append('area', area);
      form.append('latitude', Number(formData.coordinates.lat));
      form.append('longitude', Number(formData.coordinates.lng));
      const date1 = new Date(start_date.current.value);
      const formattedStartDate = date1.toISOString();
      form.append('start_date', formattedStartDate);
      const date2 = new Date(last_date.current.value);
      const formattedLastDate = date2.toISOString();
      form.append('last_date', formattedLastDate);
      form.append('comment1', comment1);
      form.append('comment2', comment2.current.value);
      if (img_url1) {
        form.append('img_url1', img_url1);
      }
      if (img_url2) {
        form.append('img_url2', img_url2);
      }
      if (img_url3) {
        form.append('img_url3', img_url3);
      }
      fetch('http://localhost:8080/group/insert', {
        method: 'post',
        encType: 'multipart/form-data',
        body: form,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('신청에 실패했습니다. 다시 시도해주세요.');
          }
          return response.text();
        })
        .then((message) => {
          alert(message);
          history.go(-1);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  

  return (
    <Container className="w-75">
      <div className="group_regist">
        <div className="board">
          <div className="review_title">
            <p style={{ fontSize: '25px' }}>
              <p className="group_span">모임 개설 신청하기</p>
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
                  <Form.Control type="text" className="w-50" ref={group_title} />
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
                      <Form.Label>모임 시작일</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        ref={start_date}
                        onChange={handleStartDateChange}
                      />
                    </div>
                    <div>
                      <Form.Label>모임 종료일</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        ref={last_date}
                        onChange={handleLastDateChange}
                      />
                    </div>
                  </div>
                  {/* 주소 입력 */}
                  <Form.Group as={Row} className="mt-4 mb-3">
                    <Form.Label column sm={2}>
                      모임 주소
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
                    <input
                      type="file"
                      className="mb-3"
                      onChange={handleFileChange1}
                    />
                    <br />
                    {imgUrl1Preview && (
                      <img
                        src={imgUrl1Preview}
                        alt="미리보기"
                        style={{ width: '100px', height: '100px' }}
                      />
                    )}
                    <hr />
                    <p>모임 상세 이미지 등록</p>
                    <input
                      type="file"
                      className="mb-3"
                      onChange={handleFileChange2}
                    />
                    {imgUrl2Preview && (
                      <img
                        src={imgUrl2Preview}
                        alt="미리보기"
                        style={{ width: '100px', height: '100px' }}
                      />
                    )}
                    <input
                      type="file"
                      className="mb-3"
                      onChange={handleFileChange3}
                    />
                    {imgUrl3Preview && (
                      <img
                        src={imgUrl3Preview}
                        alt="미리보기"
                        style={{ width: '100px', height: '100px' }}
                      />
                    )}
                  </div>
                  <div>
                    <Button
                      className="register_btn ms-3 justify-content-end"
                      onClick={handleSubmit}
                    >
                      신청하기
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
