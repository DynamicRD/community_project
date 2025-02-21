import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../context/AuthContext';
import CheckAccessPermission from '../hooks/checkAccessPermission';

export default function MyAmountCharge() {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  CheckAccessPermission(isAuthenticated, userData, navigate);
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
    navigate(`/mypage/${userData.no}`);
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    const money = parseInt(formData.money, 10);

    if (isNaN(money) || money < 1000) {
      setError('천원 이상부터 충전할 수 있습니다.');
      return;
    }

    // URL에 노출되지 않도록 state를 통해 데이터 전달
    navigate(`/mypage/checkout/${userData.no}`, { state: { money } });
  };

  return (
    <Container className="mt-5 mb-5 w-50 d-flex">
      <div className="infochange p-5">
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
                className="registSummtBtn"
                variant="light"
                style={{ color: 'white' }}
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
      </div>
    </Container>
  );
}
