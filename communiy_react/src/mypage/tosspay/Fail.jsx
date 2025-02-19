import { Button, Container } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';

export default function FailPage() {
  const [searchParams] = useSearchParams();

  // 고객에게 실패 사유 알려주고 다른 페이지로 이동 (여기에 추가적인 로직을 작성할 수 있음)

  return (
    <Container className="mt-5 mb-5 w-50 d-flex">
      <div className="infochange p-5">
        <h1>결제 실패</h1>
        <div>{`사유: ${searchParams.get('message')}`}</div>
        <Link to="/mypage">
          <Button variant="secondary" block className="mt-3">
            돌아가기
          </Button>
        </Link>
      </div>
    </Container>
  );
}
