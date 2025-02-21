import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const communityData = [
  {
    id: 1,
    g_title: 'kpop 작사 모임',
    category: '문화/예술',
    user_max: '12',
    reg_date: '2024-02-09',
    area: '서울',
    type: '정기모임',
    description: '한강에서 작사 모임을 진행합니다.',
    leader: '이예찬',
    membersList: ['이예찬', '김지훈', '박수현'],
  },
  {
    id: 2,
    g_title: 'kpop 작곡 모임',
    category: '문화/예술',
    user_max: '6',
    reg_date: '2024-02-08',
    area: '서울',
    type: '정기모임',
    description: '작곡 기초부터 함께 배워요.',
    leader: '김지훈',
    membersList: ['김지훈', '박서연'],
  },
  {
    id: 3,
    g_title: '와인 시음회',
    category: '푸드/드링크',
    user_max: '12',
    reg_date: '2024-02-09',
    area: '인천',
    type: '소모임',
    description: '와인에 대한 지식을 공유합니다.',
    leader: '박수현',
    membersList: ['박수현'],
  },
];

const CommunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 🔹 useNavigate 훅 추가
  const community = communityData.find((c) => c.id === Number(id));

  if (!community) {
    return (
      <Container className="container-text">
        <h2>해당 모임을 찾을 수 없습니다.</h2>
      </Container>
    );
  }

  return (
    <Container className="user-table-container">
      <h2>{community.g_title}</h2>
      <Card className="p-4 shadow-sm">
        <h4>모임 정보</h4>
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

        {/* 🔹 멤버 리스트 추가 */}
        <h4>멤버 리스트</h4>
        {community.membersList.length > 0 ? (
          <ul>
            {community.membersList.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">현재 참여한 멤버가 없습니다.</p>
        )}

        <Button variant="secondary" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </Card>
    </Container>
  );
};

export default CommunityDetail;
