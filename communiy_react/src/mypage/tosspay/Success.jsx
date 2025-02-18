import { useContext, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const { isAuthenticated, userData } = useContext(AuthContext); // useContext 호출이 빠져있어서 추가
  const location = useLocation();

  // URL의 쿼리 파라미터에서 'amount' 값을 가져옵니다.
  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get('amount');
  const navigate = useNavigate();

  useEffect(() => {
    if (amount && userData && userData.no) {
      fetch('http://localhost:8080/mypage/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          no: userData.no,
          money: Number(amount),
        }),
      })
        .then(async (res) => {
          const text = await res.text(); // 응답을 먼저 텍스트로 받기
          try {
            const json = JSON.parse(text); // JSON 변환 시도
            console.log('충전 성공:', json);
          } catch (error) {
            console.error('JSON 파싱 실패, 서버 응답:', text);
          }
        })
        .catch((err) => console.error('충전 요청 실패:', err));
    }
  }, [amount, userData]);

  return (
    <Container className="mt-5 mb-5 w-25 d-flex">
      <div className="infochange p-5">
        <h1>충전 성공</h1>
        <div>{`결제 금액: ${Number(
          searchParams.get('amount')
        ).toLocaleString()}원`}</div>
        <a href={`/mypage/${userData?.no}`}>
          <Button variant="secondary" className="mt-3">
            돌아가기
          </Button>
        </a>
      </div>
    </Container>
  );
}
