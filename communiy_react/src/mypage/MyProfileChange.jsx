import React, { useContext, useEffect, useState } from 'react';
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

export default function MyProfileChange() {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData && isAuthenticated !== false) {
      const pathSegments = window.location.pathname.split('/');
      const pageId = pathSegments[pathSegments.length - 1];

      if (userData?.no.toString() !== pageId) {
        alert(`접근 권한이 없습니다.`);
        navigate('/');
      }
    }
  }, [isAuthenticated, userData, navigate]);
  useEffect(() => {
    console.log(userData);
    if (userData == null) {
      alert(`접근 권한이 없습니다.`);
      navigate('/');
    }
  }, [userData]);
  const [formData, setFormData] = useState({
    id: '',
    pr: '',
    profileImage: null, // 이미지 파일을 추가
  });

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
    navigate(`/mypage/${userData?.no}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="registForm mt-5 mb-5">
      <div className="infochange">
        <Container className="mt-5 w-50">
          <h2 className="text-center">프로필 정보 수정</h2>
          <Form onSubmit={handleSubmit}>
            {/* 프로필 사진 업로드 */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                프로필 사진 업로드
              </Form.Label>
              <Col sm={10}>
                <InputGroup className="inputIdGroup" bsPrefix="./LoginPage.css">
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
              <Form.Label column sm={4}>
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
                <Button className="registSummtBtn" type="submit">
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
      </div>
    </Container>
  );
}
