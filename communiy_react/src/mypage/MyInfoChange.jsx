import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './myInfoChange.css'; // 작성한 CSS 파일 임포트
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
import AddressInput from './daumAPI/AddressInput';

export default function MyInfoChange() {
  const [isAddressInputVisible, setIsAddressInputVisible] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    pass: '',
    repass: '',
    name: '',
    gender: '', // 성별 추가
    phone1: '02',
    phone2: '',
    phone3: '',
    birth: '',
    email: '',
    addcode: '',
    address01: '',
    address02: '',
    pr: '',
  });

  const [errors, setErrors] = useState({
    nickname: '',
    pass: '',
    repass: '',
    name: '',
    phone2: '',
    phone3: '',
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
      pass: '',
      repass: '',
      name: '',
      gender: '', // 성별 리셋
      phone1: '02',
      phone2: '',
      phone3: '',
      birth: '',
      email: '',
      addcode: '',
      address01: '',
      address02: '',
      pr: '',
    });
    setErrors({
      nickname: '',
      pass: '',
      repass: '',
      name: '',
      phone2: '',
      phone3: '',
      birth: '',
      email: '',
      addcode: '',
    });
  };

  const handleGoBack = () => {
    navigate('/mypage');
  };

  // 패턴 조건 설정
  const patterns = {
    nickname: /^[a-zA-Z0-9가-힣]{2,10}$/,
    pass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
    repass: (value) => value === formData.pass,
    name: /^[가-힣a-zA-Z]{2,5}$/,
    phone2: /^[0-9]{3,4}$/,
    phone3: /^[0-9]{4}$/,
    birth: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
            case 'pass':
              errorMessage =
                '비밀번호는 대소문자, 숫자, 특수문자가 포함되어야 하며, 8자 이상 20자 이하로 입력해주세요.';
              break;
            case 'repass':
              errorMessage = '비밀번호 확인이 비밀번호와 일치하지 않습니다.';
              break;
            case 'name':
              errorMessage =
                '이름은 2자 이상 5자 이하로 한글 또는 영문만 가능합니다.';
              break;
            case 'phone2':
              errorMessage = '전화번호는 3~4자리 숫자로 입력해주세요.';
              break;
            case 'phone3':
              errorMessage = '전화번호는 4자리 숫자로 입력해주세요.';
              break;
            case 'birth':
              errorMessage = '생년월일은 YYYY-MM-DD 형식으로 입력해주세요.';
              break;
            case 'email':
              errorMessage = '이메일 형식이 올바르지 않습니다.';
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

    for (const field in formData) {
      validateField(field, formData[field]);
      if (errors[field]) {
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
      window.alert('수정되었습니다.');
      navigate('/mypage');
    } else {
      window.alert('조건이 위배되어 회원정보 수정에 실패하였습니다.');
    }
  };
  // 버튼 클릭 시 AddressInput 활성화/비활성화
  const handleButtonClick = () => {
    setIsAddressInputVisible((prevState) => !prevState); // 상태를 반전시킴
  };

  return (
    <Container className="mt-5 mb-5 bg-light p-5 w-50">
      <div className="infochange">
        <h2 className="text-center">개인 정보 수정</h2>
        <Form onSubmit={handleSubmit}>
          {/* 닉네임 입력 */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              닉네임
            </Form.Label>
            <Col sm={10}>
              <InputGroup>
                <FormControl
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => alert('중복 확인')}
                >
                  중복확인
                </Button>
              </InputGroup>
              {errors.nickname && (
                <div className="text-danger">{errors.nickname}</div>
              )}
            </Col>
          </Form.Group>

          {/* 비밀번호 입력 */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              비밀번호
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                name="pass"
                value={formData.pass}
                onChange={handleChange}
              />
              {errors.pass && <div className="text-danger">{errors.pass}</div>}
            </Col>
          </Form.Group>

          {/* 비밀번호 확인 */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              비밀번호 확인
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                name="repass"
                value={formData.repass}
                onChange={handleChange}
              />
              {errors.repass && (
                <div className="text-danger">{errors.repass}</div>
              )}
            </Col>
          </Form.Group>

          {/* 이름 입력 */}
          <Form.Group as={Row} className="mb-3">
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
          <Form.Group as={Row} className="mb-3">
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

          {/* 전화번호 입력 */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              전화번호
            </Form.Label>
            <Col sm={10}>
              <div className="phone-input-group">
                <Form.Select
                  name="phone1"
                  value={formData.phone1}
                  onChange={handleChange}
                  className="phone-select"
                >
                  <option value="02">02</option>
                  <option value="010">010</option>
                </Form.Select>
                <span>-</span>
                <FormControl
                  type="text"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleChange}
                  className="phone-input"
                />
                <span>-</span>
                <FormControl
                  type="text"
                  name="phone3"
                  value={formData.phone3}
                  onChange={handleChange}
                  className="phone-input"
                />
              </div>
              {errors.phone2 && (
                <div className="text-danger">{errors.phone2}</div>
              )}
              {errors.phone3 && (
                <div className="text-danger">{errors.phone3}</div>
              )}
            </Col>
          </Form.Group>

          {/* 생년월일 입력 */}
          <Form.Group as={Row} className="mb-3">
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
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              이메일
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </Col>
          </Form.Group>

          {/* 우편번호 찾기 */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              우편번호
            </Form.Label>
            <Col sm={4}>
              <InputGroup>
                <FormControl
                  type="text"
                  name="addcode"
                  value={formData.addcode}
                  onChange={handleChange}
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
          <Form.Group as={Row} className="mb-3">
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
              />
            </Col>
          </Form.Group>

          {/* 상세주소 입력 */}
          <Form.Group as={Row} className="mb-3">
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
          <Form.Group as={Row} className="mb-3 text-center">
            <Col sm={12}>
              <Button variant="primary" type="submit">
                정보수정
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
