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
    console.log('userData 대기중');
    if (!userData) return; // userData가 로드될 때까지 기다림

    if (isAuthenticated !== false) {
      const pathSegments = window.location.pathname.split('/');
      const pageId = pathSegments[pathSegments.length - 1];
      if (userData?.no.toString() !== pageId) {
        alert('접근 권한이 없습니다.');
        navigate('/');
      }
    }
  }, [isAuthenticated, userData, navigate]);
  return (
    <Container className="mt-5 mb-5 w-50 d-flex">
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
