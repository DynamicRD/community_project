import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../context/AuthContext';

export default function MyAmountCharge() {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData && isAuthenticated !== false) {
      const pathSegments = window.location.pathname.split('/');
      const pageId = pathSegments[pathSegments.length - 1];

      if (userData?.no.toString() !== pageId) {
        alert('접근 권한이 없습니다.');
        navigate('/');
      }
    }
  }, [isAuthenticated, userData, navigate]);
  useEffect(() => {
    console.log(userData);
    if (userData == null) {
      alert('접근 권한이 없습니다.');
      navigate('/');
    }
  }, [userData]);
  const [formData, setFormData] = useState({
    money: '',
  });
  const [error, setError] = useState(''); // 에러 메시지 상태 추가

  // 금액 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // 입력값 변경 시 에러 메시지 초기화
    if (error) {
      setError('');
    }
  };

  // 폼 초기화
  const handleReset = () => {
    setFormData({
      money: '',
    });
    setError(''); // 에러 메시지 초기화
  };

  // 돌아가기 버튼 핸들러
  const handleGoBack = () => {
    navigate('/mypage');
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 금액이 유효한지 체크 (정수이며 1 이상)
    const money = parseInt(formData.money, 10);

    if (isNaN(money) || money < 1000) {
      setError('천원 이상부터 충전할수 있습니다.');
      return; // 유효하지 않으면 제출을 막고 에러 메시지 표시
    }

    // 금액을 쿼리 파라미터로 전달하며 '/mypage/checkout'로 이동
    navigate(`/mypage/checkout?money=${money}/${userData?.no}`);
  };

  return (
    <Container className="mt-5 mb-5 w-25">
      <h2>포인트 충전하기</h2>

      {/* 금액 입력 */}
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            금액
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="money"
              value={formData.money}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        {/* 에러 메시지 표시 */}
        {error && (
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <p className="text-danger">{error}</p>
            </Col>
          </Form.Group>
        )}

        {/* 버튼들 */}
        <Form.Group as={Row} className="mb-3 text-center">
          <Col sm={12}>
            <Button
              variant="light m-3"
              style={{
                border: '1px solid rgba(255, 47, 0, 0.65)',
                backgroundColor: '#ff2d00',
                color: 'white',
              }}
              type="submit"
            >
              충전하기
            </Button>
            &nbsp;&nbsp;
            <Button variant="secondary" type="button" onClick={handleReset}>
              다시입력
            </Button>
            &nbsp;&nbsp;
            <Button variant="secondary" type="button" onClick={handleGoBack}>
              돌아가기
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}
