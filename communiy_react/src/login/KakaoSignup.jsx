import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../mypage/MyInfoChange.css'; // 작성한 CSS 파일 임포트
import {
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AddressInput from '../mypage/daumAPI/AddressInput';

export default function KakaoSignup() {
  const [isAddressInputVisible, setIsAddressInputVisible] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const handleNickDuplicateCheck = () => {
    const { nickname } = formData; // 현재 입력된 닉네임임

    // 닉네임이 비어있는 경우
    if (!nickname) {
      alert('아이디를 입력해주세요.');
      return;
    }

    // 서버에  닉네임이 중복 확인 요청
    fetch(
      `http://localhost:8080/member/nickduplicatecheck?nickname=${nickname}`,
      {
        method: 'GET', // GET 방식으로 요청
      }
    )
      .then((response) => response.json()) // JSON 응답 처리
      .then((data) => {
        if (data.isDuplicate) {
          setIsNicknameAvailable(false);
          alert('이미 존재하는 닉네임입니다.');
        } else {
          setIsNicknameAvailable(true);
          alert('사용 가능한 닉네임입니다.');
        }
      })
      .catch((error) => {
        console.error('닉네임 중복 확인 오류:', error);
        alert('닉네임 중복 확인에 실패했습니다. 다시 시도해주세요.');
      });
  };

  const [formData, setFormData] = useState({
    nickname: '',
    name: '',
    gender: '', // 성별 추가
    birth: '',
    email: '',
    addcode: '',
    address01: '',
    address02: '',
    providerID: '',
    provider: 'kakao',
    picture: '',
  });

  useEffect(() => {
    const fetchGoogleUserInfo = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/member/google_info',
          {
            method: 'GET',
            credentials: 'include', // 쿠키 포함 요청
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch Google user info');
        }

        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          nickname: data.name, // ID를 닉네임으로 기본 설정 (원하는 대로 변경 가능)
          email: data.email,
          providerId: data.id,
          picture: data.picture,
        }));
      } catch (error) {
        console.error('Error fetching Google user info:', error);
      }
    };

    fetchGoogleUserInfo();
  }, []);

  const [errors, setErrors] = useState({
    nickname: '',
    name: '',
    birth: '',
    email: '',
    addcode: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // 닉네임 입력값이 변경될 경우 중복 체크 상태 초기화
    if (name === 'nickname') {
      setIsNicknameAvailable(false);
    }
    validateField(name, value); // 입력 시 바로 검증
  };

  const handlePostcodeComplete = (zonecode, address) => {
    setFormData((prev) => ({
      ...prev,
      addcode: zonecode,
      address01: address,
    }));
    setIsAddressInputVisible((prevState) => !prevState);
  };

  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      gender: e.target.value, // 성별 변경
    });
  };

  const handleReset = () => {
    setFormData({
      nickname: '',
      name: '',
      gender: '', // 성별 리셋
      birth: '',
      addcode: '',
      address01: '',
      address02: '',
    });
    setErrors({
      nickname: '',
      name: '',
      birth: '',
      email: '',
      addcode: '',
    });
  };

  const handleGoBack = () => {
    navigate('/login');
  };

  // 패턴 조건 설정
  const patterns = {
    nickname: /^[a-zA-Z0-9가-힣]{2,10}$/,
    name: /^[가-힣a-zA-Z]{2,5}$/,
    phone2: /^[0-9]{3,4}$/,
    phone3: /^[0-9]{4}$/,
    birth: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    addcode: /^[0-9]{5}$/,
  };

  const validateField = (name, value) => {
    let errorMessage = '';
    if (patterns[name]) {
      if (typeof patterns[name] === 'function') {
        errorMessage = !patterns[name](value)
          ? '비밀번호가 일치하지 않습니다.'
          : '';
      } else {
        if (!patterns[name].test(value)) {
          switch (name) {
            case 'nickname':
              errorMessage =
                '닉네임은 2자 이상 10자 이하, 한글/영문/숫자만 사용 가능합니다.';
              break;
            case 'name':
              errorMessage =
                '이름은 2자 이상 5자 이하로 한글 또는 영문만 가능합니다.';
              break;
            case 'birth':
              errorMessage = '생년월일은 YYYY-MM-DD 형식으로 입력해주세요.';
              break;
            case 'addcode':
              errorMessage = '우편번호는 5자리 숫자로 입력해주세요.';
              break;
            default:
              errorMessage = '형식이 올바르지 않습니다.';
          }
        }
      }
    }

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { ...errors };

    // 폼 데이터에서 빈 값이 있는지 체크
    for (const field in formData) {
      if (formData[field] === '') {
        isValid = false;
      } else {
        // 기존의 패턴에 맞는 값인지 확인
        validateField(field, formData[field]);
        if (errors[field]) {
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const isValid = validateForm();
    console.log(isNicknameAvailable);

    //isValid &&
    if (isNicknameAvailable) {
      try {
        //구글 전용으로 저장해야함
        const response = await fetch('http://localhost:8080/member/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // formData를 JSON으로 변환하여 전송
        });

        const data = await response.json(); // 서버 응답 받기

        if (response.ok) {
          alert('가입되었습니다.');
          navigate('/');
        } else {
          console.log(data.message);
          alert(`회원가입 실패: ${data.message || '알 수 없는 오류'}`);
        }
      } catch (error) {
        console.error('회원가입 오류:', error);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    } else if (!isNicknameAvailable) {
      alert('닉네임 중복체크를 해주세요.');
    } else {
      alert('조건이 위배되어 회원가입에 실패하였습니다.');
    }
  };

  // 버튼 클릭 시 AddressInput 활성화/비활성화
  const handleButtonClick = () => {
    setIsAddressInputVisible((prevState) => !prevState); // 상태를 반전시킴
  };

  // 버튼 클릭 시 인증번호 입력 칸 활성화
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(true);
  };

  return (
    <Container className="registForm mt-5 mb-5">
      <div className="infochange">
        <h2 className="text-center mt-5">회원가입</h2>
        <Form onSubmit={handleSubmit} className="OnSubmitForm">
          {/* 닉네임 입력 */}
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm={2}>
              닉네임
            </Form.Label>
            <Col sm={10}>
              <InputGroup className="inputIdGroup" bsPrefix="./LoginPage.css">
                <FormControl
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  style={{
                    width: '68%',
                    borderRight: 'none',
                    borderRadius: '5px 0px 0px 5px',
                  }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={handleNickDuplicateCheck}
                  className="inputIdBtn"
                >
                  중복확인
                </Button>
              </InputGroup>
              {errors.nickname && (
                <div className="text-danger">{errors.nickname}</div>
              )}
            </Col>
          </Form.Group>

          {/* 이름 입력 */}
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm={2}>
              이름
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </Col>
          </Form.Group>

          {/* 성별 입력 */}
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm={2}>
              성별
            </Form.Label>
            <Col sm={10}>
              <Row>
                <Col sm="auto">
                  <Form.Check
                    type="radio"
                    label="남자"
                    name="gender"
                    value="남자"
                    checked={formData.gender === '남자'}
                    onChange={handleGenderChange}
                  />
                </Col>
                <Col sm="auto">
                  <Form.Check
                    type="radio"
                    label="여자"
                    name="gender"
                    value="여자"
                    checked={formData.gender === '여자'}
                    onChange={handleGenderChange}
                  />
                </Col>
              </Row>
              {errors.gender && (
                <div className="text-danger">{errors.gender}</div>
              )}
            </Col>
          </Form.Group>

          {/* 생년월일 입력 */}
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm={2}>
              생년월일
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
                placeholder="ex: 0000-00-00"
              />
              {errors.birth && (
                <div className="text-danger">{errors.birth}</div>
              )}
            </Col>
          </Form.Group>

          {/* 이메일 입력 */}
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm={2}>
              이메일
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </Col>
          </Form.Group>

          {/* 우편번호 찾기 */}
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm={2}>
              우편번호
            </Form.Label>
            <Col sm={5}>
              <InputGroup>
                <FormControl
                  type="text"
                  name="addcode"
                  value={formData.addcode}
                  onChange={handleChange}
                  readOnly // 사용자가 수정할 수 없지만 복사 가능
                />

                <Button variant="outline-secondary" onClick={handleButtonClick}>
                  찾기
                </Button>

                {/* isAddressInputVisible가 true일 때만 AddressInput을 렌더링 */}
                {isAddressInputVisible && (
                  <AddressInput onComplete={handlePostcodeComplete} />
                )}
              </InputGroup>
              {errors.addcode && (
                <div className="text-danger">{errors.addcode}</div>
              )}
            </Col>
          </Form.Group>

          {/* 주소 입력 */}
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm={2}>
              주소
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="address01"
                value={formData.address01}
                onChange={handleChange}
                size="50"
                readOnly // 사용자가 수정할 수 없지만 복사 가능
              />
            </Col>
          </Form.Group>

          {/* 상세주소 입력 */}
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm={2}>
              상세주소
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="address02"
                value={formData.address02}
                onChange={handleChange}
                size="30"
              />
            </Col>
          </Form.Group>

          {/* 버튼들 */}
          <Form.Group as={Row} className="btnClub mt-4 text-center">
            <Col sm={12} className="mb-4">
              <Button
                className="registSummtBtn"
                variant="light"
                style={{ color: 'white' }}
                type="submit"
              >
                가입하기
              </Button>
              &nbsp;&nbsp;
              <Button variant="secondary" type="reset" onClick={handleReset}>
                다시입력
              </Button>
              &nbsp;&nbsp;
              <Button variant="secondary" onClick={handleGoBack}>
                돌아가기
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
}
