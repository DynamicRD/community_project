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
import CheckAccessPermission from '../hooks/checkAccessPermission';

export default function MembershipWithdrawal() {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  CheckAccessPermission(isAuthenticated, userData, navigate);
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
          picture: userData.imgUrl,
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
          picture: userData.imgUrl,
        }));
      }
    }
  }, [isAuthenticated, userData, navigate]);

  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  //인증번호 값 받는 Ref함수 추가
  const valid = useRef();

  const [formData, setFormData] = useState({
    no: '',
    pass: '',
    phone1: '02',
    phone2: '',
    phone3: '',
    email: '',
    valid: '',
    picture: '',
  });

  const [errors, setErrors] = useState({
    valid: '', // 인증번호 추가
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    validateField(name, value); // 입력 시 바로 검증
  };

  const handleReset = () => {
    setFormData({
      pass: '',
    });
    setErrors({
      pass: '',
    });
  };

  const handleGoBack = () => {
    navigate(`/mypage/${userData?.no}`);
  };

  // 패턴 조건 설정
  const patterns = {
    valid: /^[0-9]{6}$/,
  };

  const validateField = (name, value) => {
    let errorMessage = '';
    if (patterns[name]) {
      if (!patterns[name].test(value)) {
        switch (name) {
          case 'valid':
            errorMessage = '인증번호는 6자리 숫자로 입력해주세요.';
            break;

          default:
            errorMessage = '형식이 올바르지 않습니다.';
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
        if (formData['pass'] === '') {
          isValid = false;
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
    if (userData.provider == 'none') {
      if (isValid && isPhoneChecked) {
        try {
          const response = await fetch(
            'http://localhost:8080/member/withdrawal',
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
            alert('회원탈퇴 되었습니다.');
            handleLogout();
            navigate(`/`);
          } else {
            alert('비밀번호가 불일치합니다');
          }
        } catch (error) {
          console.error('개인정보 수정 오류:', error);
          alert('서버와의 통신 중 오류가 발생했습니다.');
        }
      } else if (!isPhoneChecked) {
        alert('전화번호 인증을 해주세요.');
      } else {
        alert('회원탈퇴에 실패했습니다.');
      }
    } else {
      if (isValid && isEmailChecked) {
        try {
          const response = await fetch(
            'http://localhost:8080/member/withdrawal',
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
            alert('회원탈퇴 되었습니다.');
            handleLogout();
            navigate(`/`);
          } else {
            alert('이메일 인증 불일치합니다');
          }
        } catch (error) {
          console.error('개인정보 수정 오류:', error);
          alert('서버와의 통신 중 오류가 발생했습니다.');
        }
      } else if (!isPhoneChecked) {
        alert('전화번호 인증을 해주세요.');
      } else {
        alert('회원탈퇴에 실패했습니다.');
      }
    }
  };
  const handleSnsSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const isValid = validateForm();

    if (isValid && isPhoneChecked) {
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
    } else if (!isPhoneChecked) {
      alert('전화번호 인증을 해주세요.');
    } else {
      alert('조건이 위배되어 개인정보 수정에 실패하였습니다.');
    }
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
                <h5>
                  회원탈퇴를 진행하기 위해 비밀번호 재입력과 전화번호를
                  인증해주세요
                </h5>
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
                    <FormControl
                      name="phone1"
                      value={formData.phone1}
                      onChange={handleChange}
                      style={{
                        width: 100,
                      }}
                      readOnly
                    ></FormControl>
                    <span>-</span>
                    <FormControl
                      type="text"
                      name="phone2"
                      id="phone"
                      value={formData.phone2}
                      onChange={handleChange}
                      className="phone-input me-1"
                      readOnly
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
                      readOnly
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
                          fetch('http://localhost:8080/send-one', {
                            method: 'post',
                            body: form,
                          }).then(() => {
                            handleClick();
                            alert('인증번호가 발송 되었습니다');
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
                      form.append('no', userData.no);

                      try {
                        fetch('http://localhost:8080/mypage/email', {
                          method: 'post',
                          body: form,
                        }).then(() => {
                          handleClick();
                          alert('인증번호가 발송 되었습니다');
                        });
                      } catch (error) {
                        console.error('회원가입 오류:', error);
                        alert('서버와의 통신 중 오류가 발생했습니다.');
                      }
                    }}
                  >
                    <span>번호발송</span>
                  </Button>
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
                      fetch('http://localhost:8080/mypage/email/number')
                        .then((response) => {
                          return response.json();
                        })
                        .then((data) => {
                          if (Number(valid.current.value) === data) {
                            setIsEmailChecked(true);
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
