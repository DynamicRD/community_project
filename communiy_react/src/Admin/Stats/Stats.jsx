import { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

// Chart.js 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const Stats = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedCommunityStat, setSelectedCommunityStat] = useState('전체');
  // 일별 수입, 방문자 통계 (Line Chart)
  const dailyData = {
    labels: [
      '2024-02-01',
      '2024-02-02',
      '2024-02-03',
      '2024-02-04',
      '2024-02-05',
    ],
    datasets: [
      {
        label: '일별 수입 ($)',
        data: [300, 500, 250, 600, 700],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
      },
    ],
  };

  const visitorData = {
    labels: [
      '2024-02-01',
      '2024-02-02',
      '2024-02-03',
      '2024-02-04',
      '2024-02-05',
    ],
    datasets: [
      {
        label: '홈페이지 방문자',
        data: [1000, 1200, 900, 1500, 1700],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      },
    ],
  };

  // 사용자 통계 (Pie Chart)
  const userData = {
    labels: ['남성', '여성'],
    datasets: [
      {
        label: '성별 비율',
        data: [60, 40],
        backgroundColor: ['#797bbb', '#ee6ca5'],
      },
    ],
  };

  const ageData = {
    labels: ['10대', '20대', '30대', '40대', '50대'],
    datasets: [
      {
        label: '연령대 분포',
        data: [10, 20, 30, 40, 50, 60, 70, 80],
        backgroundColor: [
          '#797bbb',
          '#a278c0',
          '#ca72b8',
          '#ee6ca5',
          '#ff6c89',
          '#ff7767',
          '#ff8c40',
          '#ffa600',
        ],
      },
    ],
  };

  // 모임 통계 데이터
  const communityStats = {
    전체: {
      categories: [50, 40, 30, 20, 10],
      favorites: [60, 45, 35, 75, 55],
      visitors: [70, 50, 40, 60, 20],
    },
    '최근 한달': {
      categories: [30, 25, 20, 50, 40],
      favorites: [40, 30, 25, 50, 60],
      visitors: [50, 35, 30, 20, 70],
    },
  };

  return (
    <Container className="main-content mt-5">
      <h2 className="mb-4">통계 관리</h2>
      <div className="mb-3 d-flex gap-3">
        <Button variant="primary" onClick={() => setActiveTab('daily')}>
          일별 통계
        </Button>
        <Button variant="warning" onClick={() => setActiveTab('user')}>
          사용자 통계
        </Button>
        <Button variant="danger" onClick={() => setActiveTab('community')}>
          모임 통계
        </Button>
      </div>

      {activeTab === 'daily' && (
        <Card className="p-4">
          <h4>일별 통계</h4>
          <Line data={dailyData} className="p-5" />
          <Line data={visitorData} />
        </Card>
      )}
      {activeTab === 'user' && (
        <Row>
          <Col md={6}>
            <Card className="p-4">
              <h4>성별 통계</h4>
              <Pie data={userData} />
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-4">
              <h4>연령대 통계</h4>
              <Pie data={ageData} />
            </Card>
          </Col>
        </Row>
      )}
      {activeTab === 'community' && (
        <Card className="p-4">
          <h4>모임 통계</h4>
          <div className="mb-3 d-flex gap-3">
            <Button
              variant={
                selectedCommunityStat === '전체' ? 'primary' : 'secondary'
              }
              onClick={() => setSelectedCommunityStat('전체')}
            >
              전체
            </Button>
            <Button
              variant={
                selectedCommunityStat === '최근 한달' ? 'primary' : 'secondary'
              }
              onClick={() => setSelectedCommunityStat('최근 한달')}
            >
              최근 한달
            </Button>
          </div>
          <Row>
            <Col md={12}>
              <h5 className="text-center">인기 카테고리</h5>
              <Bar
                data={{
                  labels: ['A', 'B', 'C', 'D', 'E'],
                  datasets: [
                    {
                      data: communityStats[selectedCommunityStat].categories,
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                  ],
                }}
              />
            </Col>
            <Col md={12}>
              <h5 className="text-center mt-5">찜 많은 모임</h5>
              <Bar
                data={{
                  labels: ['V', 'W', 'X', 'Y', 'Z'],
                  datasets: [
                    {
                      data: communityStats[selectedCommunityStat].favorites,
                      backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    },
                  ],
                }}
              />
            </Col>
            <Col md={12}>
              <h5 className="text-center mt-5">방문자 많은 사이트</h5>
              <Bar
                data={{
                  labels: ['M', 'N', 'O', 'P', 'Q'],
                  datasets: [
                    {
                      data: communityStats[selectedCommunityStat].visitors,
                      backgroundColor: 'rgba(255, 159, 64, 0.6)',
                    },
                  ],
                }}
              />
            </Col>
          </Row>
        </Card>
      )}
    </Container>
  );
};

export default Stats;
