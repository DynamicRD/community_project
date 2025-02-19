import React, { useEffect, useRef, useState } from 'react';
import './GroupRegist.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';

export default function GroupUpdate() {
  const location = useLocation();
  const navigate = useNavigate();

  // URL에서 쿼리 파라미터를 파싱
  const queryParams = new URLSearchParams(location.search);
  const group_no = queryParams.get('group_no'); // 'g_id' 파라미터 값을 가져옴
  const [items, setGroupDetail] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/group/detail?group_no=${group_no}`)
      .then((res) => res.json())
      .then((data) => {
        setGroupDetail(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [group_no]);

  const group_title = useRef();
  const type = useRef();
  const category = useRef();
  const user_max = useRef();
  const price = useRef();
  const addr1 = useRef();
  const addr2 = useRef();
  const [area, setArea] = useState(items.AREA || '');
  const start_date = useRef();
  const last_date = useRef();
  const comment1 = useRef();
  const comment2 = useRef();
  const [img_url1, setImg_url1] = useState();
  const [img_url2, setImg_url2] = useState();
  const [img_url3, setImg_url3] = useState();
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

  const [formData, setFormData] = useState({
    location: '',
    coordinates: { lat: items.LATITUDE || '', lng: items.LONGITUDE || '' },
    placeId: '',
  });

  useEffect(() => {
    if (Object.keys(items).length > 0) {
      group_title.current.value = items.GROUP_TITLE || '';
      type.current.value = items.TYPE || '';
      category.current.value = items.CATEGORY || '';
      user_max.current.value = items.USER_MAX || '';
      price.current.value = items.PRICE || '';
      addr1.current.value = items.ADDR1 || '';
      addr2.current.value = items.ADDR2 || '';
      const startDate = new Date(items.START_DATE || '');
      startDate.setHours(startDate.getHours() + 9);
      start_date.current.value = startDate.toISOString().slice(0, 16);
      const lastDate = new Date(items.LAST_DATE || '');
      lastDate.setHours(lastDate.getHours() + 9);
      last_date.current.value = lastDate.toISOString().slice(0, 16);
      comment1.current.value = items.COMMENT1 || '';
      comment2.current.value = items.COMMENT2 || '';
      setImg_url1(items.IMG_URL1 || '');
      setImg_url2(items.IMG_URL2 || '');
      setImg_url3(items.IMG_URL3 || '');
      setImgUrl1Preview(items.IMG_URL1 ? `/images/${items.IMG_URL1}` : null);
      setImgUrl2Preview(items.IMG_URL2 ? `/images/${items.IMG_URL2}` : null);
      setImgUrl3Preview(items.IMG_URL3 ? `/images/${items.IMG_URL3}` : null);
    }
  }, [items]);

  useEffect(() => {
    setImg_url1(items.IMG_URL1 || '');
    setImg_url2(items.IMG_URL2 || '');
    setImg_url3(items.IMG_URL3 || '');
  }, [items.IMG_URL1, items.IMG_URL2, items.IMG_URL3]);

  /**  Google Places API 자동완성 설정 */
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      addr1.current
    );
    autoCompleteRef.current.addListener('place_changed', () => {
      const place = autoCompleteRef.current.getPlace();
      if (place.geometry) {
        console.log('Place:', place);
        console.log('Latitude:', place.geometry.location.lat());
        console.log('Longitude:', place.geometry.location.lng());
        setFormData((prev) => ({
          ...prev,
          location: place.formatted_address,
          coordinates: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
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
        setArea(extractedArea);  // 지역 업데이트
        console.log('Extracted area: ', area); // 추출된 지역 확인
      }
    }, [formData.location]); // formData.location이 변경될 때마다 실행

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
    if (!addr1.current.value) {
      alert('모임 주소를 입력해주세요.');
      addr1.current.focus();
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
    if (
      new Date(last_date.current.value) < new Date(start_date.current.value)
    ) {
      alert('모임 종료일은 모임 시작일보다 빠를 수 없습니다.');
      last_date.current.focus();
      return;
    }
    if (!comment1.current.value) {
      alert('모임장 한마디를 입력해주세요.');
      comment1.current.focus();
      return;
    }
    if (!comment2.current.value) {
      alert('모임 소개글을 입력해주세요.');
      comment2.current.focus();
      return;
    }

    if (confirm('수정하시겠습니까?')) {
      const form = new FormData();
      form.append('group_title', group_title.current.value);
      form.append('type', type.current.value);
      form.append('category', category.current.value);
      form.append('user_max', Number(user_max.current.value));
      form.append('price', Number(price.current.value));
      form.append('addr1', addr1.current.value);
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
      form.append('comment1', comment1.current.value);
      form.append('comment2', comment2.current.value);
      if (img_url1) {
        form.append('img_url1', img_url1);
      } else {
        form.append('img_url1', items.IMG_URL1 || '');
      }
      if (img_url2) {
        form.append('img_url2', img_url2);
      } else {
        form.append('img_url2', items.IMG_URL2 || '');
      }
      if (img_url3) {
        form.append('img_url3', img_url3);
      } else {
        form.append('img_url3', items.IMG_URL3 || '');
      }

      fetch(`http://localhost:8080/group/update?group_no=${group_no}`, {
        method: 'post',
        body: form,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('수정에 실패했습니다. 다시 시도해주세요.');
          }
          return response.text();
        })
        .then((message) => {
          alert(message);
          navigate(`/group/detail?group_no=${group_no}`);
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
              <b className='group_span'>
                모임 정보 수정
              </b>
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
                    <Form.Label>모임시작일</Form.Label>
                    <Form.Control type="datetime-local" ref={start_date} />
                  </div>
                  <div>
                    <Form.Label>모임종료일</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      ref={last_date}
                      onChange={() => {
                        if (
                          new Date(last_date.current.value) <
                          new Date(start_date.current.value)
                        ) {
                          alert(
                            '모임 종료일은 모임 시작일보다 빠를 수 없습니다.'
                          );
                          last_date.current.value = '';
                          last_date.current.focus();
                        }
                      }}
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
                      ref={addr1}
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
                      ref={addr2}
                      size="30"
                      name="addr2"
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
                  <p>모임 대표 이미지 수정</p>
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