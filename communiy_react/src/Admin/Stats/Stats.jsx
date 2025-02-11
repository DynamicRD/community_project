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

  // 모임 통계 (Stacked Bar Chart)
  const communityData = {
    labels: [
      '전체',
      '최근 한달',
      '인기 카테고리',
      '찜 많은 모임',
      '방문자 많은 사이트',
    ],
    datasets: [
      {
        label: '음악',
        data: [50, 20, 30, 10, 15],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: '스포츠',
        data: [30, 15, 40, 25, 10],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
      {
        label: '예술',
        data: [40, 25, 20, 30, 20],
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
      },
    ],
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
          <Bar
            data={communityData}
            options={{
              animation: { duration: 2000 },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      const categories = ['음악', '스포츠', '예술'];
                      return (
                        categories[tooltipItem.datasetIndex] +
                        ' - ' +
                        tooltipItem.raw
                      );
                    },
                  },
                },
              },
              responsive: true,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        </Card>
      )}
    </Container>
  );
};

export default Stats;
