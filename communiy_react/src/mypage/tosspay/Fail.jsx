import { Button, Container } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import './Fail.css';

export default function FailPage() {
  const [searchParams] = useSearchParams();

  // 고객에게 실패 사유 알려주고 다른 페이지로 이동 (여기에 추가적인 로직을 작성할 수 있음)

  return (
    <div className="fail-container">
    <div className="fail-icon">❌</div>
    <h1 className="fail-title">결제 실패</h1>
    <div className="fail-content">
      <p>
        <strong>주문 아이디:</strong> {searchParams.get('orderId')}

      </p>
      <p>
        <strong>{`사유: ${searchParams.get('message')}`}</strong>
      </p>
    </div>
    <button
      className="fail-button"
      onClick={() => (window.location.href = '/mypage')}
    >
      돌아가기
    </button>
  </div>
);
}

