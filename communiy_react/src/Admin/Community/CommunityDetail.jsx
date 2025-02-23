import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const CommunityDetail = () => {
  const { groupNo } = useParams(); // URL 파라미터로부터 groupNo를 받음
  const navigate = useNavigate();
  const [communityData, setCommunityData] = useState(null); // 단일 객체로 설정 (초기값을 null로)

  useEffect(() => {
    // groupNo (id)를 포함하여 GET 요청
    fetch(`http://localhost:8080/admin/community/${groupNo}`)
      .then((response) => response.json()) // JSON 응답 처리
      .then((data) => setCommunityData(data)) // 데이터를 객체로 설정
      .catch((error) => console.error('데이터 로드 실패:', error));
  }, [groupNo]); // id 변경 시 useEffect 재실행

  // 데이터가 로드되지 않은 경우 로딩 상태 처리
  if (!communityData) {
    return (
      <Container className="container-text">
        <h2>해당 모임을 찾을 수 없습니다.</h2>
      </Container>
    );
  }

  return (
    <Container className="user-table-container">
      <h2>{communityData.GROUP_TITLE}</h2>
      <Card className="p-4 shadow-sm">
        <h4>모임 정보</h4>
        <Row className="mb-3">
          <Col sm={4}>
            <Card className="p-2">카테고리: {communityData.CATEGORY === 'culture' && '문화/예술'}
                {communityData.CATEGORY === 'food' && '푸드/드링크'}
                {communityData.CATEGORY === 'edu' && '교육'}
                {communityData.CATEGORY === 'travel' && '여행'}
                {communityData.CATEGORY === 'hobby' && '취미'}</Card>
          </Col>
          <Col sm={4}>
            <Card className="p-2">참여인원: {communityData.USER_MAX}</Card>
          </Col>
          <Col sm={4}>
            <Card className="p-2">모임등록일: {communityData.REG_DATE}</Card>
          </Col>
          <Col sm={4}>
<Card className="p-2">모임장 아이디: {communityData.NO}</Card>
          </Col>
          <Col sm={4}>
            <Card className="p-2">장소: {communityData.AREA}</Card>
          </Col>
          <Col sm={4}>
            <Card className="p-2">
              모임구분:{' '}
              {communityData.TYPE === 'regular'
                ? '정기모임'
                : communityData.TYPE === 'one'
                ? '동행 소모임'
                : '기타'}
            </Card>
          </Col>
        </Row>

        <Button variant="secondary" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </Card>
    </Container>
  );
};

export default CommunityDetail;
