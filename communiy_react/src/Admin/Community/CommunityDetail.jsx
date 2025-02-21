import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const CommunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommunityDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/admin/communityDetail/${id}`
        );
        if (!response.ok) {
          throw new Error('데이터를 가져오는 데 실패했습니다.');
        }
        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error('해당 모임을 찾을 수 없습니다.');
        }

        // 데이터를 가공하여 상태에 저장
        const formattedData = data.map((item) => ({
          id: item.group_no,
          g_title: item.group_title,
          category: item.category,
          user_max: item.user_max,
          reg_date: item.reg_date || '날짜 없음',
          area: item.area || '미정',
          type: item.type || '미정',
          description: '상세 정보 없음',
          leader: '관리자',
          membersList: [],
        }));

        setCommunities(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityDetail();
  }, [id]);

  if (loading) {
    return (
      <Container className="container-text">
        <h2>로딩 중...</h2>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="container-text">
        <h2>오류 발생: {error}</h2>
      </Container>
    );
  }

  return (
    <Container className="user-table-container">
      <h2>모임 상세 정보</h2>
      {communities.map((community, index) => (
        <Card key={index} className="p-4 shadow-sm mb-4">
          <h4>{community.g_title}</h4>
          <Row className="mb-3">
            <Col sm={4}>
              <Card className="p-2">카테고리: {community.category}</Card>
            </Col>
            <Col sm={4}>
              <Card className="p-2">참여인원: {community.user_max}</Card>
            </Col>
            <Col sm={4}>
              <Card className="p-2">모임등록일: {community.reg_date}</Card>
            </Col>
            <Col sm={4}>
              <Card className="p-2">모임장: {community.leader}</Card>
            </Col>
            <Col sm={4}>
              <Card className="p-2">장소: {community.area}</Card>
            </Col>
            <Col sm={4}>
              <Card className="p-2">모임구분: {community.type}</Card>
            </Col>
          </Row>

          <h4>상세정보</h4>
          <p>{community.description}</p>

          <h4>멤버 리스트</h4>
          {community.membersList.length > 0 ? (
            <ul>
              {community.membersList.map((member, idx) => (
                <li key={idx}>{member}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">현재 참여한 멤버가 없습니다.</p>
          )}
        </Card>
      ))}

      <Button variant="secondary" onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </Container>
  );
};

export default CommunityDetail;
