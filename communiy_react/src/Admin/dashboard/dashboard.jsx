import { Container, Row, Col, Breadcrumb, Card } from 'react-bootstrap';
import StatCards from './StatCards';
import TransactionsTable from './TransactionsTable';
import TrafficChart from './TrafficChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './dashboard.css'; // 추가된 CSS 파일을 임포트

const Dashboard = () => {
  const [categoryData, setCategoryData] = useState({
    culture: 0,
    food: 0,
    hobby: 0,
    travel: 0,
    edu: 0,
  });

  useEffect(() => {
    fetch('http://localhost:8080/admin/stats/popularCategoryInMonth')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.reduce(
          (acc, curr) => {
            acc[curr.CATEGORY] = curr.CATEGORY_COUNT;
            return acc;
          },
          { culture: 0, food: 0, hobby: 0, travel: 0, edu: 0 }
        );

        setCategoryData(formattedData);
      })
      .catch((error) =>
        console.error('인기 카테고리 데이터 로드 실패:', error)
      );
  }, []);

  return (
    <div className="dashboard">
      <div className="d-flex">
        <Container className="main-content p-4">
          {/* <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Overview</Breadcrumb.Item>
          </Breadcrumb> */}
          <br />
          <br />
          <h2>대시보드</h2>
          <StatCards />
          <Card className="mt-5 card-scroll h-75">
            {' '}
            {/* card-scroll 클래스 추가 */}
            <Card.Body>
              <h5 className="text-center">최근 한달 인기 카테고리</h5>
              <Bar
                data={{
                  labels: ['문화/예술', '푸드/드링크', '취미', '여행', '교육'],
                  datasets: [
                    {
                      label: '최근 한달 인기 카테고리',
                      data: [
                        categoryData['culture'],
                        categoryData['food'],
                        categoryData['hobby'],
                        categoryData['travel'],
                        categoryData['edu'],
                      ],
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
