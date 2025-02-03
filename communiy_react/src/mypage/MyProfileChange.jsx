import React, { useState } from 'react';
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

export default function MyProfileChange() {
  const [formData, setFormData] = useState({
    id: '',
    pr: '',
    profileImage: null, // 이미지 파일을 추가
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        profileImage: files[0], // 파일을 상태에 저장
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleReset = () => {
    setFormData({
      id: '',
      pr: '',
      profileImage: null, // 이미지 초기화
    });
  };

  const handleGoBack = () => {
    navigate('/mypage');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // FormData 객체를 만들어 서버로 이미지와 데이터를 전송
    const formDataToSend = new FormData();
    formDataToSend.append('id', formData.id);
    formDataToSend.append('pr', formData.pr);
    formDataToSend.append('profileImage', formData.profileImage); // 이미지 추가

    // 서버로 FormData 전송 (Spring Boot 서버 주소로 요청)
    fetch('http://localhost:8080/mypage/fileupload', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Profile updated:', data);
        window.alert('수정되었습니다.');
        navigate('/mypage');
      })
      .catch((error) => {
        console.error('Error:', error);
        window.alert('오류가 발생했습니다.');
      });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">프로필 정보 수정</h2>
      <Form onSubmit={handleSubmit}>
        {/* 프로필 사진 업로드 */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            프로필 사진 업로드
          </Form.Label>
          <Col sm={9}>
            <InputGroup>
              <FormControl
                type="file"
                name="profileImage"
                onChange={handleChange}
              />
            </InputGroup>
            {formData.profileImage && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile Preview"
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            )}
          </Col>
        </Form.Group>

        {/* 자기소개 입력 */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            자기소개
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              name="pr"
              value={formData.pr}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        {/* 버튼들 */}
        <Form.Group as={Row} className="mb-3 text-center">
          <Col sm={12}>
            <Button variant="primary" type="submit">
              프로필 수정
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
    </Container>
  );
}
