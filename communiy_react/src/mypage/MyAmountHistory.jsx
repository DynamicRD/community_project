import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router';

// 목업 데이터
const mockData = [
  {
    historyNo: 1,
    amount: 5000,
    category: '충전', // 분류 항목
    regDate: '2025-02-01T12:00:00',
  },
  {
    historyNo: 2,
    amount: 10000,
    category: '환불', // 분류 항목
    regDate: '2025-02-02T15:30:00',
  },
  {
    historyNo: 3,
    amount: 15000,
    category: '모임참여', // 분류 항목
    regDate: '2025-02-03T10:45:00',
  },
];

function MyAmountHistory() {
  const [coinList, setCoinList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect 안에서 목업 데이터를 설정
  useEffect(() => {
    const fetchCoinData = () => {
      try {
        // 목업 데이터를 coinList에 설정
        setCoinList(mockData);
      } catch (err) {
        setError('데이터를 불러오는 데 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, []);

  // 날짜 형식화 함수 (단순히 ISO 형식으로 변환)
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().slice(0, 19).replace('T', ' ');
  };

  return (
    <Container className="mt-5 p-5">
      <div>
        <main style={{ textAlign: 'center' }}>
          <h2>거래 내역</h2>

          {loading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p>{error}</p>
          ) : coinList.length === 0 ? (
            <p>목록이 비어 있습니다.</p>
          ) : (
            <Table bordered hover striped responsive="md" className="mt-4">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>분류</th>
                  <th>금액</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
                {coinList.map((chargeCoin) => (
                  <tr key={chargeCoin.historyNo}>
                    <td>{chargeCoin.historyNo}</td>
                    <td>{chargeCoin.category}</td>
                    <td>{chargeCoin.amount}</td>
                    <td>{formatDate(chargeCoin.regDate)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Link to="/mypage">
            <Button variant="secondary" block className="mt-3">
              돌아가기
            </Button>
          </Link>
        </main>
      </div>
    </Container>
  );
}

export default MyAmountHistory;
