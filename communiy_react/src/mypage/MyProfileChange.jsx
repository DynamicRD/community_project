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
import axios from 'axios';
import CheckAccessPermission from '../hooks/checkAccessPermission';

export default function MyProfileChange() {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  CheckAccessPermission(isAuthenticated, userData, navigate);

  const [formData, setFormData] = useState({
    pr: '',
    profileImage: null,
    no: userData.no,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        profileImage: files[0],
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
      pr: '',
      profileImage: null,
    });

    document.getElementById('profileImageInput').value = ''; // input 초기화
  };

  const handleGoBack = () => {
    navigate(`/mypage/${userData?.no}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profileImage) {
      alert('이미지를 선택하세요.');
      return;
    } else if (!formData.pr) {
      alert('자기소개를 작성해주세요.');
      return;
    }

    const data = new FormData();
    data.append('pr', formData.pr);
    data.append('no', formData.no);
    data.append('image', formData.profileImage);

    try {
      const response = await axios.post(
        'http://localhost:8080/mypage/profileupdate',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('프로필 수정 성공:', response.data);
      window.location.href = `/mypage/${userData.no}`;
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('업로드 실패');
    }
  };

  return (
    <Container className="registForm mt-5 mb-5">
      <div className="infochange">
        <Container className="mt-5 w-50">
          <h2 className="text-center">프로필 정보 수정</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                프로필 사진 업로드
              </Form.Label>
              <Col sm={10}>
                <InputGroup className="inputIdGroup">
                  <FormControl
                    id="profileImageInput"
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
