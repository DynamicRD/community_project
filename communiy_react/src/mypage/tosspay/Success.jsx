import { Button, Container } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();

  // 서버로 승인 요청 (여기서는 실제 요청을 보내는 로직을 작성할 수 있습니다)

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
