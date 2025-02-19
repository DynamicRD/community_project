import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext'; //

export default function FindId() {
  const phoneNumber = useRef();
  const nameValue = useRef();
  const phoneInput = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isNameChecked, setIsNameChecked] = useState(false);
  const [responseIdValue, setResponseIdValue] = useState(null);
  const { isAuthenticated, userData } = useContext(AuthContext);

  const handleClick = () => {
    setIsVisible(true);
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    valid: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    valid: '',
  });

  const nameIsNotEmpty = () => {
    if (nameValue.current !== null) {
      setIsNameChecked(true);
    } else {
      setIsNameChecked(false);
    }
  };

  useEffect(() => {
    console.log(responseIdValue);
    setLoading(true);
  }, [responseIdValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 전화번호 입력값 변경 시 인증 상태 초기화

    if (name === 'phone') {
      setIsPhoneChecked(false);
    }
    validateField(name, value); // 입력 시 바로 검증
  };

  const validateField = (name, value) => {
    let errorMessage = '';
    if (patterns[name]) {
      if (!patterns[name].test(value)) {
        switch (name) {
          // case 'name':
          //   errorMessage =
          //     '이름은 2자 이상 5자 이하로 한글 또는 영문만 가능합니다.';
          //   break;
          case 'phone':
            errorMessage = '전화번호 숫자 11자리 - 문자 없이 입력 바랍니다.';

            break;
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

  const patterns = {
    // name: /^[가-힣a-zA-Z]{2,5}$/,
    phone: /^[0-9]{11}$/,
    valid: /^[0-9]{6}$/,
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

    console.log(isNameChecked);
    console.log(isPhoneChecked);
    console.log(isPhoneValid);

    if (isValid && isNameChecked && isPhoneChecked) {
      try {
        const form = new FormData();
        form.append('phone', phoneInput.current.value);
        form.append('name', nameValue.current.value);
        const response = await fetch('http://localhost:8080/member/checkId', {
          method: 'POST',
          body: form, // formData를 JSON으로 변환하여 전송
        });

        const data = await response.json(); // 서버 응답 받기
        setResponseIdValue(data);
        if (response.ok) {
          alert('인증이 완료 되었습니다');
        } else {
          alert(`회원가입 실패: ${data.message || '알 수 없는 오류'}`);
        }
      } catch (error) {
        console.error('회원가입 오류:', error);
      }
    } else if (!isNameChecked) {
      alert('아이디를 입력 바랍니다.');
      nameValue.current.focus();
    } else if (!isPhoneChecked) {
      alert('전화번호 인증을 해주세요.');
      phoneInput.current.focus();
    } else if (!isPhoneValid) {
      alert('전화번호 인증을 먼저 진행하여 주세요');
      phoneNumber.current.focus();
    } else {
      alert('조건이 위배되어 아이디 찾기에 실패하였습니다.');
    }
  };
  if (!loading) {
    return (
      <Container className="d-flex justify-content-center">
        <div>
          <span>Loading...</span>
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        {isAuthenticated ? (
          <>
            {alert('잘못된 접근 입니다.')}
            {navigate('/')}
          </>
        ) : (
          <>
            {responseIdValue === null ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                  }}
                >
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      width: '400px',
                    }}
                    className="LoginBg"
                  >
                    <h2
                      style={{ textAlign: 'center', fontWeight: '900' }}
                      className="mt-3 mb-4"
                    >
                      아이디 찾기
                    </h2>
                    <Form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="name"
                        placeholder="이름을 입력하시오"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                        }}
                        value={formData.name}
                        ref={nameValue}
                        onChange={handleChange}
                        onFocus={nameIsNotEmpty}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignContent: 'center',
                          marginTop: '10px',
                        }}
                      >
                        <input
                          type="text"
                          placeholder="전화번호를 입력하시오"
                          name="phone"
                          style={{
                            width: '78%',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                          }}
                          value={formData.phone}
                          onChange={handleChange}
                          ref={phoneInput}
                        />
                        <div
                          className="findIdButton ms-1"
                          style={{
                            width: '22%',
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            fontSize: '14px',
                          }}
                          onClick={() => {
                            if (formData.phone === '') {
                              alert('전화번호를 입력 바랍니다');
                              phoneInput.current.value = '';
                              phoneInput.current.focus();
                            } else {
                              setIsPhoneChecked(true);
                              const form = new FormData();
                              form.append('number', formData.phone);

                              fetch('http://localhost:8080/send-one2', {
                                method: 'post',
                                body: form,
                              }).then((data) => {
                                // if (formData.phone === data) {
                                console.log(data);
                                alert('인증번호가 발송 되었습니다');
                                handleClick();
                                // } else {
                                //   alert('전화번호를 잘못 입력하였습니다');
                                //   phoneNumber.current.value = '';
                                //   phoneNumber.current.focus();
                                // }
                              });
                            }
                          }}
                        >
                          번호발송
                        </div>
                      </div>
                      <div>
                        {errors.phone && (
                          <div className="text-danger">{errors.phone}</div>
                        )}
                      </div>
                      <div
                        style={{
                          display: isVisible === true ? 'block' : 'none',
                        }}
                      >
                        <div className="d-flex">
                          <input
                            placeholder="인증번호입력"
                            type="text"
                            name="valid"
                            ref={phoneNumber}
                            className="validCode2 me-1"
                            style={{
                              width: '78%',
                              padding: '10px',
                              marginBottom: '10px',
                              border: '1px solid #ccc',
                              borderRadius: '5px',
                            }}
                            onChange={handleChange}
                          />
                          <div
                            className="findIdButton"
                            style={{
                              width: '22%',
                              padding: '11px',
                              marginBottom: '10px',
                              borderRadius: '5px',
                              fontSize: '15px',
                            }}
                            onClick={() => {
                              fetch('http://localhost:8080/send-one/number2')
                                .then((response) => {
                                  return response.json();
                                })
                                .then((data) => {
                                  if (
                                    Number(phoneNumber.current.value) === data
                                  ) {
                                    setIsPhoneValid(true);
                                    alert('인증이 완료 되었습니다');
                                  } else {
                                    alert('인증에 실패하였습니다');
                                    phoneNumber.current.value = '';
                                    phoneNumber.current.focus();
                                  }
                                });
                            }}
                          >
                            인증확인
                          </div>
                        </div>
                      </div>
                      <div>
                        {errors.valid && (
                          <div className="text-danger">{errors.valid}</div>
                        )}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: '10px',
                        }}
                      >
                        <button className="buttonLogin">아이디 찾기</button>
                      </div>
                    </Form>
                    <div
                      style={{
                        textAlign: 'center',
                        marginTop: '15px',
                        fontSize: '14px',
                      }}
                    >
                      <p>
                        비밀번호를 잊어버리셨나요?{' '}
                        <Link
                          to="/find-password"
                          style={{
                            textDecoration: 'none',
                          }}
                        >
                          <span className="findId">비밀번호 찾기</span>
                        </Link>
                        <br />
                        아직 회원이 아니신가요?{' '}
                        <Link
                          to="/signup"
                          style={{
                            textDecoration: 'none',
                          }}
                        >
                          <span className="findId">회원가입</span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                  }}
                >
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      width: '400px',
                    }}
                    className="LoginBg"
                  >
                    <span className="mt-3 mb-4 d-flex justify-content-center">
                      {responseIdValue.length < 0 ? (
                        <>입력한 정보에 대한 아이디가 존재하지 않습니다</>
                      ) : (
                        <>
                          <div className="d-flex flex-column justify-content-center text-center">
                            <div className="mb-3">
                              <span>회원님의 아이디는</span>
                            </div>
                            <div>
                              <b>{responseIdValue.ID} </b>
                            </div>
                            <div className="mt-3">
                              <span>입니다</span>
                            </div>
                          </div>
                        </>
                      )}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <button
                        className="buttonLogin mb-3"
                        onClick={() => {
                          navigate('/login');
                        }}
                      >
                        로그인
                      </button>
                    </div>
                    <div
                      style={{
                        textAlign: 'center',
                        marginTop: '15px',
                        fontSize: '14px',
                      }}
                    >
                      <p>
                        비밀번호를 잊어버리셨나요?{' '}
                        <Link
                          to="/find-password"
                          style={{
                            textDecoration: 'none',
                          }}
                        >
                          <span className="findId">비밀번호 찾기</span>
                        </Link>
                        <br />
                        아직 회원이 아니신가요?{' '}
                        <Link
                          to="/signup"
                          style={{
                            textDecoration: 'none',
                          }}
                        >
                          <span className="findId">회원가입</span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Container>
    );
  }
}
