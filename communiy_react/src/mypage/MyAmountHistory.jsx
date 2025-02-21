import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckAccessPermission from '../hooks/checkAccessPermission';

function MyAmountHistory() {
  const { isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  CheckAccessPermission(isAuthenticated, userData, navigate);
  const [error, setError] = useState(null);
  const [coinList, setCoinList] = useState([]);
  const { userId } = useParams();
  let num = 1;

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/mypage/transactionHistory?no=${userData?.no}`,
          {
            method: 'GET',

            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('데이터를 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        setCoinList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [userId]);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().slice(0, 19).replace('T', ' ');
  };

  return (
    <Container className="mt-5 p-5 w-75">
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
                <tr key={chargeCoin.type}>
                  <td>{num++}</td>
                  <td>{chargeCoin.type}</td>
                  <td>{chargeCoin.amount}</td>
                  <td>{formatDate(chargeCoin.regDate)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Link to={`/mypage/${userData?.no}`}>
          <Button variant="secondary" className="mt-3">
            돌아가기
          </Button>
        </Link>
      </main>
    </Container>
  );
}

export default MyAmountHistory;
