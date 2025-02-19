import React, { useRef, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router';

export default function ResetPassword() {
  const Navigate = useNavigate();
  const rePass = useRef();
  const newPass = useRef();
  const [newPassChecked, setIsNewPassChecked] = useState(false);
  const [rePassChecked, setRePassChecked] = useState(false);

  const [formData2, setFormData2] = useState({
    newPass: '',
    repass: '',
  });

  const [errors2, setErrors2] = useState({
    newPass: '',
    repass: '',
  });

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

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: value,
    });

    validateField2(name, value); // 입력 시 바로 검증
  };

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

  const patterns2 = {
    newPass:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
    repass: (value) => value === formData2.newPass,
  };

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

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const isValid = validateForm2();

    console.log(newPassChecked);
    console.log(rePassChecked);

    if (isValid && newPassChecked && rePassChecked) {
      try {
        const response = await fetch('http://localhost:8080/member/???????', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData2), // formData를 JSON으로 변환하여 전송
        });

        const data = await response.json(); // 서버 응답 받기

        if (response.ok) {
          alert('비밀번호 변경이 완료 되었습니다.');
          Navigate('/');
        } else {
          alert(`회원가입 실패: ${data.message || '알 수 없는 오류'}`);
        }
      } catch (error) {
        console.error('회원가입 오류:', error);
        alert('서버와의 통신 중 오류가 발생했습니다.');
      }
    } else if (!newPassChecked) {
      alert('새 비밀번호를 입력 바랍니다.');
      newPass.current.focus();
    } else if (!rePassChecked) {
      alert('비밀번호를 재 입력 바랍니다');
      rePass.current.focus();
    } else {
      alert('조건이 위배되어 회원가입에 실패하였습니다.');
    }
  };

  return (
    <Container>
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
            style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}
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
    </Container>
  );
}
