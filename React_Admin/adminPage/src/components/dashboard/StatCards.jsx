// src/components/StatCards.jsx
import { Row, Col, Card } from 'react-bootstrap';
import './dashboard.css';
const stats = [
  {
    title: 'Customers',
    value: '345k',
    info: '18.2% increase',
    color: 'success',
  },
  { title: 'Revenue', value: '$2.4k', info: '4.6% increase', color: 'success' },
  { title: 'Purchases', value: '43', info: '2.6% decrease', color: 'danger' },
  { title: 'Traffic', value: '64k', info: '2.5% increase', color: 'success' },
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
                {stat.info} since last month
              </p>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatCards;
