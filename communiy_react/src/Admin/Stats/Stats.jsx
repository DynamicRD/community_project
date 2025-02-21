import { useEffect, useState } from 'react';
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
  const [popularGroups, setPopularGroups] = useState([]);
  const [genderData, setGenderData] = useState({ 남자: 0, 여자: 0 });
  const [visited, setVisited] = useState([]); // 백엔드에서 가져온 데이터 저장
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedCommunityStat, setSelectedCommunityStat] = useState('전체');
  const [visitorCount, setVisitorCount] = useState(null);
  const [allAgeData, setAllAgeData] = useState({
    '10대': 0,
    '20대': 0,
    '30대': 0,
    '40대': 0,
    '50대 이상': 0,
  });
  const [categoryData, setCategoryData] = useState({
    culture: 0,
    food: 0,
    hobby: 0,
    travel: 0,
    edu: 0,
  });

  useEffect(() => {
    fetch('http://localhost:8080/admin/stats/popularGroup')
      .then((response) => response.json())
      .then((data) => {
        setPopularGroups(data);
      })
      .catch((error) => console.error('인기 모임 데이터 로드 실패:', error));
  }, []);

  // 페이지 로드 시 백엔드 API 호출하여 방문자 수 증가 및 조회
  useEffect(() => {
    fetch('http://localhost:8080/home/visit')
      .then((response) => response.json())
      .then((data) => {
        console.log('현재 방문자 수:', data);
        setVisitorCount(data);
      })
      .catch((error) => {
        console.error('방문자 수 증가 에러:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/admin/stats/age')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.reduce(
          (acc, curr) => {
            acc[curr.AGE_GROUP] = curr.COUNT;
            return acc;
          },
          { '10대': 0, '20대': 0, '30대': 0, '40대': 0, '50대 이상': 0 }
        );

        setAllAgeData(formattedData);
      })
      .catch((error) => console.error('연령대 통계 데이터 로드 실패:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/admin/stats/gender')
      .then((response) => response.json())
      .then((data) => {
        // API 응답을 객체 형태로 변환
        const formattedData = data.reduce(
          (acc, curr) => {
            acc[curr.GENDER] = curr.COUNT;
            return acc;
          },
          { 남자: 0, 여자: 0 }
        );

        setGenderData(formattedData);
      })
      .catch((error) => console.error('성별 통계 데이터 로드 실패:', error));
  }, []);
  useEffect(() => {
    fetch('http://localhost:8080/admin/stats/popularCategory')
      .then((response) => response.json())
      .then((data) => {
        // API 응답을 객체 형태로 변환
        const formattedData = data.reduce(
          (acc, curr) => {
            acc[curr.CATEGORY] = curr.CATEGORY_COUNT;
            return acc;
          },
          { culture: 0, food: 0, hobby: 0, travel: 0, edu: 0 }
        );

        setCategoryData(formattedData);
      })
      .catch((error) => console.error('성별 통계 데이터 로드 실패:', error));
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:8080/admin/stats/visitAll')
  //     .then((response) => response.json())
  //     .then((data) => setVisited(data))
  //     .catch((error) => console.error('데이터 로드 실패:', error));
  // }, []);

  // 오늘 기준으로 4일전 ~ 오늘 날짜의 라벨 생성 함수
  const getLastFiveDaysLabels = () => {
    const labels = [];
    const today = new Date();
    for (let i = 4; i >= 0; i--) {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);
      const year = pastDate.getFullYear();
      const month = String(pastDate.getMonth() + 1).padStart(2, '0');
      const day = String(pastDate.getDate()).padStart(2, '0');
      labels.push(`${year}-${month}-${day}`);
    }
    return labels;
  };

  // 일별 수입, 방문자 통계 (Line Chart)
  const dailyData = {
    labels: getLastFiveDaysLabels(),
    datasets: [
      {
        label: '일별 수입 (원)',
        data: [20, 17, 26, 12, 30],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
      },
    ],
  };

  const visitorData = {
    labels: getLastFiveDaysLabels(),
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
        data: [genderData.남자, genderData.여자],
        backgroundColor: ['#797bbb', '#ee6ca5'],
      },
    ],
  };

  const ageData = {
    labels: ['10대', '20대', '30대', '40대', '50대 이상'],
    datasets: [
      {
        label: '연령대 분포',
        data: [
          allAgeData['10대'],
          allAgeData['20대'],
          allAgeData['30대'],
          allAgeData['40대'],
          allAgeData['50대 이상'],
        ], // 데이터가 없을 경우 0으로 처리
        backgroundColor: [
          '#ca72b8',
          '#ee6ca5',
          '#ff6c89',
          '#ff7767',
          '#ff8c40',
        ],
      },
    ],
  };

  // 모임 통계 데이터
  const communityStats = {
    전체: {
      categories: [
        categoryData['culture'],
        categoryData['food'],
        categoryData['hobby'],
        categoryData['travel'],
        categoryData['edu'],
      ],
      favorites: popularGroups.map((group) => group.BASKET_COUNT),
    },
    '최근 한달': {
      categories: [30, 25, 20, 50, 40],
      favorites: [40, 30, 25, 50, 60],
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
                  labels: ['문화/예술', '푸드/드링크', '취미', '여행', '교육'],
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
                  labels: popularGroups.map((group) => group.GROUP_TITLE),
                  datasets: [
                    {
                      data: communityStats[selectedCommunityStat].favorites,
                      backgroundColor: 'rgba(153, 102, 255, 0.6)',
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
