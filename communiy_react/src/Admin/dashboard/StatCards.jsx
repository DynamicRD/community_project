// src/components/StatCards.jsx
import { Row, Col, Card } from 'react-bootstrap';
import './dashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StatCards = () => {
  const [stats, setStats] = useState([
    {
      title: '고객',
      value: '345k',
      info: '18.2% increase',
      color: 'success',
    },
    { title: '수익', value: '$2.4k', info: '4.6% increase', color: 'success' },
    {
      title: '모임회원수',
      value: '43',
      info: '2.6% decrease',
      color: 'danger',
    },
    { title: '방문객', value: '64k', info: '2.5% increase', color: 'success' },
  ]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/admin/dashboard/detailselect')
      .then((response) => {
        const data = response.data; // API 응답 데이터

        // API 데이터 매핑 (응답 구조에 맞게 수정 필요)
        const updatedStats = [
          {
            title: '고객',
            value: `${data.currentData}명`,
            info:
              data.change === 0
                ? '변동없음'
                : data.status === 'decrease'
                ? `${data.change}% 감소`
                : `${data.change}% 증가`,
            color:
              data.change === 0
                ? 'warning' // 변동없음: 노란색
                : data.status === 'decrease'
                ? 'danger' // 감소: 빨간색
                : 'success', // 증가: 초록색
          },
          {
            title: '수익',
            value: `${data.currentData}원`,
            info: data.change,
            color: data.status == 'decrease' ? 'danger' : 'success',
          },
          {
            title: '모임회원수',
            value: `${data.currentData}명`,
            info: data.change,
            color: data.status == 'decrease' ? 'danger' : 'success',
          },
          {
            title: '방문객',
            value: `${data.currentData}명`,
            info: data.change,
            color: data.status == 'decrease' ? 'danger' : 'success',
          },
        ];

        setStats(updatedStats);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);

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
