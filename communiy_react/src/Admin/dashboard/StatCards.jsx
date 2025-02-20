// src/components/StatCards.jsx
import { Row, Col, Card } from 'react-bootstrap';
import './dashboard.css';
const stats = [
  {
    title: '고객',
    value: '345k',
    info: '18.2% increase',
    color: 'success',
  },
  { title: '수익', value: '$2.4k', info: '4.6% increase', color: 'success' },
  { title: '모임회원수', value: '43', info: '2.6% decrease', color: 'danger' },
  { title: '방문객', value: '64k', info: '2.5% increase', color: 'success' },
];

const StatCards = () => {
  return (
    <Row className="mb-4 gx-3">
      {stats.map((stat, index) => (
        <Col key={index} md={3}>
          <Card className="text-center stat-card">
            <Card.Header>{stat.title}</Card.Header>
            <Card.Body>
              <h5>{stat.value}</h5>
              <p className={`text-${stat.color}`}>
                전월 대비 <br />
                {stat.info}
              </p>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatCards;
