import { Button, Container } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import './Success.css';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();

  // 서버로 승인 요청 (여기서는 실제 요청을 보내는 로직을 작성할 수 있습니다)

  return (
      <div className="success-container">
        <div className="success-icon">🎉</div>
        <h1 className="success-title">결제 성공!</h1>
        <div className="success-content">
          <p>
            <strong>주문 아이디:</strong> {searchParams.get('orderId')}
          </p>
          <p>
            <strong>결제 금액:</strong> 
            {Number(searchParams.get('amount')).toLocaleString()}원
          </p>
        </div>
        <button
          className="success-button"
          onClick={() => (window.location.href = '/mypage')}
        >
          돌아가기
        </button>
      </div>
  );
}
