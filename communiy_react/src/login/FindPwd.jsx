import './LoginPage.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext'; //

export default function FindPwd() {
  const Navigate = useNavigate();
  const phoneNumber = useRef();
  const nameValue = useRef();
  const phoneInput = useRef();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isNameChecked, setIsNameChecked] = useState(false);
  const [idValue, setIdValue] = useState(null);
  const { isAuthenticated, userData } = useContext(AuthContext);

  //새 비밀번호 작성 폼
  const rePass = useRef();
  const newPass = useRef();
  const [newPassChecked, setIsNewPassChecked] = useState(false);
  const [rePassChecked, setRePassChecked] = useState(false);

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

  //새 비밀번호 작성 폼
  const [formData2, setFormData2] = useState({
    newPass: '',
    repass: '',
  });

  const [errors2, setErrors2] = useState({
    newPass: '',
    repass: '',
  });

  const nameIsNotEmpty = () => {
    if (nameValue.current !== null) {
      setIsNameChecked(true);
    } else {
      setIsNameChecked(false);
    }
  };

  //새 비밀번호 작성 폼
  const newPassNotEmpty = () => {
    if (newPass.current !== null) {
      setIsNewPassChecked(true);
    } else {
      setIsNewPassChecked(false);
    }
  };
  const rePassNotEmpty = () => {
    if (rePass.current !== null) {
      setRePassChecked(true);
    } else {
      setRePassChecked(false);
    }
  };

  //비밀번호 찾기 확인 검증 useEffect
  useEffect(() => {
    console.log(idValue);
    setLoading(true);
  }, [idValue]);

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

  //새 비밀번호 작성 폼
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: value,
    });

    validateField2(name, value); // 입력 시 바로 검증
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

  //새 비밀번호 작성 폼
  const validateField2 = (name, value) => {
    let errorMessage = '';
    if (patterns2[name]) {
      if (typeof patterns2[name] === 'function') {
        errorMessage = !patterns2[name](value)
          ? '비밀번호가 일치하지 않습니다.'
          : '';
      } else {
        if (!patterns2[name].test(value)) {
          switch (name) {
            case 'newPass':
              errorMessage =
                '비밀번호는 대소문자, 숫자, 특수문자가 포함되어야 하며, 8자 이상 20자 이하로 입력해주세요.';
              break;
            case 'repass':
              errorMessage = '비밀번호 확인이 비밀번호와 일치하지 않습니다.';
              break;
            default:
              errorMessage = '형식이 올바르지 않습니다.';
          }
        }
      }
    }

    setErrors2({
      ...errors2,
      [name]: errorMessage,
    });
  };

  const patterns = {
    // name: /^[가-힣a-zA-Z]{2,5}$/,
    phone: /^[0-9]{11}$/,
    valid: /^[0-9]{6}$/,
  };

  //새 비밀번호 작성 폼
  const patterns2 = {
    newPass:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
    repass: (value) => value === formData2.newPass,
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

  //새 비밀번호 작성 폼
  const validateForm2 = () => {
    let isValid = true;
    let newErrors = { ...errors2 };

    // 폼 데이터에서 빈 값이 있는지 체크
    for (const field in formData2) {
      if (formData2[field] === '') {
        isValid = false;
      } else {
        // 기존의 패턴에 맞는 값인지 확인
        validateField2(field, formData2[field]);
        if (errors2[field]) {
          isValid = false;
        }
      }
    }

    setErrors2(newErrors);
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
        const response = await fetch('http://localhost:8080/member/checkPw', {
          method: 'POST',
          body: form,
        });

        const data = await response.json(); // 서버 응답 받기
        setIdValue(data);
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
      alert('조건이 위배되어 비밀번호 재 설정에 실패하였습니다');
    }
  };

  //새 비밀번호 작성 폼
  const handleSubmit2 = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const isValid = validateForm2();

    console.log(newPassChecked);
    console.log(rePassChecked);

    if (isValid && newPassChecked && rePassChecked) {
      try {
        const form = new FormData();
        form.append('newPass', newPass.current.value);
        form.append('id', idValue.ID);
        form.append('phone', idValue.PHONE);
        const response = await fetch('http://localhost:8080/member/changePw', {
          method: 'POST',
          body: form,
        });

        if (response.ok) {
          alert('비밀번호 변경이 완료 되었습니다.');
          Navigate('/login');
        }
      } catch (error) {
        console.error('회원가입 오류:', error);
      }
    } else if (!newPassChecked) {
      alert('새 비밀번호를 입력 바랍니다.');
      newPass.current.focus();
    } else if (!rePassChecked) {
      alert('비밀번호를 재 입력 바랍니다');
      rePass.current.focus();
    } else {
      alert('조건이 위배 비밀번호 변경에 실패하였습니다.');
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
            {Navigate('/')};
          </>
        ) : (
          <>
            {idValue === null ? (
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
                      비밀번호 재 설정
                    </h2>
                    <Form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="name"
                        placeholder="아이디를 입력하시오"
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
                        <div className="d-flex align-content-center">
                          <input
                            placeholder="인증번호입력"
                            type="text"
                            name="valid"
                            ref={phoneNumber}
                            className="validCode me-1"
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
                        {' '}
                        <button className="buttonLogin">
                          비밀번호 재 설정
                        </button>
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
                        아이디를 잊어버리셨나요?{' '}
                        <Link
                          to="/find-id"
                          style={{
                            textDecoration: 'none',
                          }}
                        >
                          <span className="findId">아이디 찾기</span>
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
                {' '}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      padding: '20px',
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      width: '400px',
                    }}
                  >
                    <h2
                      style={{ textAlign: 'center', fontWeight: '900' }}
                      className="mt-3 mb-4"
                    >
                      새 비밀번호 입력
                    </h2>
                    <Form onSubmit={handleSubmit2}>
                      <input
                        type="password"
                        name="newPass"
                        placeholder="새 비밀번호를 입력 해 주세요"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          marginTop: '10px',
                        }}
                        value={formData2.newPass}
                        onChange={handleChange2}
                        onFocus={newPassNotEmpty}
                        ref={newPass}
                      />
                      <div>
                        {errors2.newPass && (
                          <div className="text-danger">{errors2.newPass}</div>
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
                        <input
                          type="password"
                          placeholder="비밀번호를 재 입력 바랍니다"
                          name="repass"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            marginBottom: '10px',
                          }}
                          value={formData2.repass}
                          onChange={handleChange2}
                          onFocus={rePassNotEmpty}
                          ref={rePass}
                        />
                      </div>
                      <div>
                        {errors2.repass && (
                          <div className="text-danger">{errors2.repass}</div>
                        )}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '10px',
                        }}
                      >
                        <button
                          style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#ff471d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '25px',
                            cursor: 'pointer',
                          }}
                        >
                          비밀번호 재 설정
                        </button>
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
                        아이디를 잊어버리셨나요?{' '}
                        <Link
                          to="/find-id"
                          style={{
                            textDecoration: 'none',
                          }}
                        >
                          <span className="findId">아이디 찾기</span>
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
