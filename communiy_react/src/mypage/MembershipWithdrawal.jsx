import React, { useContext, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './myInfoChange.css';
import {
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import AddressInput from './daumAPI/AddressInput';

export default function MembershipWithdrawal() {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData && isAuthenticated !== false) {
      const pathSegments = window.location.pathname.split('/');
      const pageId = pathSegments[pathSegments.length - 1];

      if (userData?.phone != null) {
        const phoneParts = userData?.phone.match(/(02|010)(\d{3,4})(\d{4})/);
        const [, first, middle, last] = phoneParts;

        setFormData((prev) => ({
          ...prev,
          no: userData.no,
          nickname: userData.nickname,
          name: userData.name,
          gender: userData.gender,
          phone1: first,
          phone2: middle,
          phone3: last,
          birth: userData.birth.split(' ')[0],
          email: userData.email,
          addcode: userData.zipCode,
          address01: userData.addr1,
          address02: userData.addr2,
          provider: userData.provider,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          no: userData.no,
          nickname: userData.nickname,
          name: userData.name,
          gender: userData.gender,
          phone1: '',
          phone2: '',
          phone3: '',
          birth: userData.birth.split(' ')[0],
          email: userData.email,
          addcode: userData.zipCode,
          address01: userData.addr1,
          address02: userData.addr2,
          provider: userData.provider,
        }));
      }
    }
  }, [isAuthenticated, userData, navigate]);

  useEffect(() => {
    console.log('userData 대기중');
    if (!userData) return; // userData가 로드될 때까지 기다림

    if (isAuthenticated !== false) {
      const pathSegments = window.location.pathname.split('/');
      const pageId = pathSegments[pathSegments.length - 1];
      if (userData?.no.toString() !== pageId) {
        alert('접근 권한이 없습니다.');
        navigate('/');
      }
    }
  }, [isAuthenticated, userData, navigate]); // userData가 변할 때만 실행

  const [isAddressInputVisible, setIsAddressInputVisible] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
  const [isPhoneDuplicateChecked, setIsPhoneDuplicateChecked] = useState(true);
  const [isPhoneChecked, setIsPhoneChecked] = useState(true);

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

  //인증번호 값 받는 Ref함수 추가
  const valid = useRef();

  const [formData, setFormData] = useState({
    no: '',
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
    provider: '',
    valid: '',
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
    valid: '', // 인증번호 추가
  });

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
    // 전화번호 입력값 변경 시 인증 상태 초기화
    if (name === 'phone1' || name === 'phone2' || name === 'phone3') {
      setIsPhoneChecked(false);
      setIsPhoneDuplicateChecked(false);
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
    });
    setErrors({
      nickname: '',
      pass: '',
      repass: '',
      phone2: '',
      phone3: '',
      birth: '',
      email: '',
      addcode: '',
    });
  };
  const handleResetGoogle = () => {
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
    });
    setErrors({
      nickname: '',
      pass: '',
      repass: '',
      phone2: '',
      phone3: '',
      birth: '',
      email: '',
      addcode: '',
    });
  };

  const handleGoBack = () => {
    navigate(`/mypage/${userData?.no}`);
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
    valid: /^[0-9]{6}$/,
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
            case 'valid':
              errorMessage = '인증번호는 6자리 숫자로 입력해주세요.';
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
      if (userData?.provider == 'none') {
        if (
          formData[
            ('nickname',
            'name',
            'gender',
            'phone1',
            'phone2',
            'phone3',
            'birth',
            'email',
            'addcode',
            'address01',
            'address02',
            'pass',
            'repass')
          ] === ''
        ) {
          isValid = false;
        } else {
          // 기존의 패턴에 맞는 값인지 확인
          validateField(field, formData[field]);
          if (
            errors[
              ('nickname',
              'name',
              'gender',
              'phone1',
              'phone2',
              'phone3',
              'birth',
              'email',
              'addcode',
              'address01',
              'address02',
              'pass',
              'repass')
            ]
          ) {
            isValid = false;
          }
        }
      } else {
        if (
          formData[
            ('nickname',
            'name',
            'gender',
            'phone1',
            'phone2',
            'phone3',
            'birth',
            'email',
            'addcode',
            'address01',
            'address02')
          ] === ''
        ) {
          isValid = false;
        } else {
          // 기존의 패턴에 맞는 값인지 확인
          validateField(field, formData[field]);
          if (
            errors[
              ('nickname',
              'name',
              'gender',
              'phone1',
              'phone2',
              'phone3',
              'birth',
              'email',
              'addcode',
              'address01',
              'address02')
            ]
          ) {
            isValid = false;
          }
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/member/logout',
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('오류가 발생했습니다.');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const isValid = validateForm();
    console.log(isNicknameAvailable);
    console.log(isPhoneChecked);
    console.log(isPhoneDuplicateChecked);

    if (
      isValid &&
      isNicknameAvailable &&
      isPhoneChecked &&
      isPhoneDuplicateChecked
    ) {
      try {
        const response = await fetch(
          'http://localhost:8080/member/infochange',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // formData를 JSON으로 변환하여 전송
          }
        );

        const data = await response.json(); // 서버 응답 받기

        if (response.ok) {
          alert('회원정보가 수정되었습니다. 다시 로그인해주세요');
          handleLogout();
          navigate(`/`);
        } else {
          alert(`개인정보 수정 실패: ${data.message || '알 수 없는 오류'}`);
        }
      } catch (error) {
        console.error('개인정보 수정 오류:', error);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    } else if (!isNicknameAvailable) {
      alert('닉네임 중복체크를 해주세요.');
    } else if (!isPhoneChecked) {
      alert('전화번호 인증을 해주세요.');
    } else if (!isPhoneDuplicateChecked) {
      alert('중복된 전화번호입니다.');
    } else {
      alert('조건이 위배되어 개인정보 수정에 실패하였습니다.');
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
        <h2 className="text-center mt-5">회원탈퇴</h2>
        <Form onSubmit={handleSubmit} className="OnSubmitForm">
          {userData?.provider == 'none' ? (
            <>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>
                  새 비밀번호
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="password"
                    name="pass"
                    value={formData.pass}
                    onChange={handleChange}
                  />
                  {errors.pass && (
                    <div className="errors_pass text-danger">{errors.pass}</div>
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>
                  전화번호
                </Form.Label>
                <Col sm={10}>
                  <div className="phone-input-group">
                    <Form.Select
                      name="phone1"
                      value={formData.phone1}
                      onChange={handleChange}
                      className="phone-select me-1"
                    >
                      <option value="02">02</option>
                      <option value="010">010</option>
                    </Form.Select>
                    <span>-</span>
                    <FormControl
                      type="text"
                      name="phone2"
                      id="phone"
                      value={formData.phone2}
                      onChange={handleChange}
                      className="phone-input me-1"
                    />
                    <span>-</span>
                    <FormControl
                      type="text"
                      name="phone3"
                      id="phone"
                      value={formData.phone3}
                      onChange={handleChange}
                      className="phone-input"
                      style={{
                        borderRight: 'none',
                        borderRadius: '5px 0px 0px 5px',
                      }}
                    />
                    {/* 인증번호 전송 버튼 */}
                    <Button
                      variant="outline-secondary"
                      className="numberSummit"
                      onClick={async () => {
                        const form = new FormData();
                        form.append('number1', formData.phone1);
                        form.append('number2', formData.phone2);
                        form.append('number3', formData.phone3);

                        try {
                          const response = await fetch(
                            'http://localhost:8080/member/phoneduplicatecheck',
                            {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify(formData), // formData를 JSON으로 변환하여 전송
                            }
                          )
                            .then((response) => response.json()) // JSON 응답 처리
                            .then((data) => {
                              if (data.isPhoneDuplicate) {
                                setIsPhoneDuplicateChecked(false);
                                alert('중복된 전화번호입니다.');
                              } else {
                                setIsPhoneDuplicateChecked(true);
                                fetch('http://localhost:8080/send-one', {
                                  method: 'post',
                                  body: form,
                                }).then(() => {
                                  handleClick();
                                  alert('인증번호가 발송 되었습니다');
                                });
                              }
                            });
                        } catch (error) {
                          console.error('회원가입 오류:', error);
                          alert('서버와의 통신 중 오류가 발생했습니다.');
                        }
                      }}
                    >
                      <span>번호발송</span>
                    </Button>
                  </div>

                  {errors.phone2 && (
                    <div className="text-danger">{errors.phone2}</div>
                  )}
                  {errors.phone3 && (
                    <div className="text-danger">{errors.phone3}</div>
                  )}
                </Col>
              </Form.Group>
              {/* 인증번호 체크 버튼 */}
              <div
                style={{ display: isVisible === true ? 'block' : 'none' }}
                className="mb-2"
              >
                <Form.Group as={Row} className="mb-2">
                  <Form.Label column sm={2}>
                    인증번호입력
                  </Form.Label>
                  <input
                    type="text"
                    name="valid"
                    ref={valid}
                    className="validCode"
                    style={{ width: '120px', padding: '6px' }}
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-secondary"
                    className="validButton"
                    onClick={() => {
                      fetch('http://localhost:8080/send-one/number')
                        .then((response) => {
                          return response.json();
                        })
                        .then((data) => {
                          if (Number(valid.current.value) === data) {
                            setIsPhoneChecked(true);
                            alert('인증이 완료 되었습니다');
                          } else {
                            alert('인증에 실패하였습니다');
                            valid.current.value = '';
                            valid.current.focus();
                          }
                        });
                    }}
                  >
                    인증확인
                  </Button>
                  {errors.valid && (
                    <div className="errorValid text-danger">{errors.valid}</div>
                  )}
                </Form.Group>
              </div>
            </>
          ) : (
            <>
              <h5>회원탈퇴를 진행하기 위해 이메일을 인증해주세요</h5>
              <br />
              {/* 이메일 입력 */}
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>
                  이메일
                </Form.Label>
                <Col sm={9}>
                  {userData?.provider == 'none' ? (
                    <>
                      <Form.Control
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </>
                  ) : (
                    <>
                      {' '}
                      <Form.Control
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly
                      />
                      {/* 인증번호 전송 버튼 */}
                      <Button
                        variant="outline-secondary"
                        className="numberSummit"
                        onClick={async () => {
                          const form = new FormData();
                          form.append('email', formData.email);

                          try {
                            const response = await fetch(
                              'http://localhost:8080/mypage/de',
                              {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(formData), // formData를 JSON으로 변환하여 전송
                              }
                            );
                          } catch (error) {
                            console.error('이메일 인증:', error);
                            alert('서버와의 통신 중 오류가 발생했습니다.');
                          }
                        }}
                      >
                        <span>인증발송</span>
                      </Button>
                    </>
                  )}
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </Col>
              </Form.Group>
            </>
          )}

          {/* 버튼들 */}
          <Form.Group as={Row} className="btnClub mt-4 text-center">
            <Col sm={12} className="mb-4">
              <Button
                className="registSummtBtn"
                variant="light"
                style={{ color: 'white' }}
                type="submit"
              >
                탈퇴하기
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
