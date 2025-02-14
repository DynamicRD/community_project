import { useContext, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const { isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData && isAuthenticated !== false) {
      const pathSegments = window.location.pathname.split('/');
      const pageId = pathSegments[pathSegments.length - 1];

      if (userData?.no.toString() !== pageId) {
        alert('접근 권한이 없습니다.');
        navigate('/');
      }
    }
  }, [isAuthenticated, userData, navigate]);
  useEffect(() => {
    console.log(userData);
    if (userData == null) {
      alert('접근 권한이 없습니다.');
      navigate('/');
    }
  }, [userData]);
  // 서버로 승인 요청 (여기서는 실제 요청을 보내는 로직을 작성할 수 있습니다)
  // useEffect(() => {
  //   const chargeMoney = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8080/mypage/chargeMoney?no=${
  //           userData?.no
  //         }&cash=${2}`,
  //         {
  //           method: 'GET',

  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error('데이터를 불러오는 데 실패했습니다.');
  //       }
  //     } catch (err) {

  //     } finally {

  //     }
  //   };

  //   fetchCoinData();
  // }, []);
  return (
    <Container className="mt-5">
      <h1>충전 성공</h1>
      <div>{`주문 아이디: ${searchParams.get('orderId')}`}</div>
      <div>{`결제 금액: ${Number(
        searchParams.get('amount')
      ).toLocaleString()}원`}</div>
      <Link to="/mypage">
        <Button variant="secondary" block className="mt-3">
          돌아가기
        </Button>
      </Link>
    </Container>
  );
}
