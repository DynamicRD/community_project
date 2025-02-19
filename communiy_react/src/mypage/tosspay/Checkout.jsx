import { useContext, useEffect, useRef, useState } from 'react';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid'; // nanoid를 사용하여 주문 ID 생성
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

export default function Checkout() {
  const location = useLocation();
  const { money } = location.state;
  const { isAuthenticated, userData } = useContext(AuthContext);
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState('ongoing'); // 기본값:
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && isAuthenticated !== false) {
      const pathSegments = window.location.pathname.split('/');
      const pageId = pathSegments[pathSegments.length - 1];
      console.log(userData.selfPr);
      if (userData?.no.toString() !== pageId) {
        alert(`접근 권한이 없습니다.`);
        navigate('/');
      }
    }
  }, [isAuthenticated, userData, navigate]);
  useEffect(() => {
    console.log(userData);
    if (userData == null) {
      alert(`접근 권한이 없습니다.`);
      navigate('/');
    }
  }, [userData]);
  const paymentWidgetRef = useRef(null); // PaymentWidgetInstance를 참조
  const paymentMethodsWidgetRef = useRef(null); // 결제 방법 위젯을 참조

  const [price, setPrice] = useState(money); // 초기 가격 설정
  const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY; // 환경 변수에서 가져오기
  const customerKey = import.meta.env.VITE_TOSS_CUSTOMER_KEY; // 환경 변수에서 가져오기
  const orderId = import.meta.env.VITE_TOSS_ORDER_ID; // 환경 변수에서 가져오기
  const customerMobilePhone = import.meta.env.VITE_TOSS_CUSTOMER_MOBILE_PHONE; // 환경 변수에서 가져오기
  console.log(clientKey);
  console.log(customerKey);
  console.log(orderId);
  useEffect(() => {
    (async () => {
      // 결제 위젯을 비동기로 로드
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      // 결제 방법 위젯 렌더링
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-widget',
        price
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // 가격 변경 시 결제 금액 업데이트
    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [price]); // 가격(price) 변경 시 실행

  const handlePayment = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      // 결제 요청
      await paymentWidget?.requestPayment({
        orderId: orderId, // 주문 ID는 nanoid로 생성
        orderName: '포인트 충전',
        customerName: '김토스',
        customerEmail: 'customer123@gmail.com',
        successUrl: `http://localhost:8080/mypage/charge/${userData.no}`,
        failUrl: `http://localhost:5173/mypage/checkout/fail/${userData.no}`,
        customerMobilePhone: '01012234123',
      });
    } catch (err) {
      console.log(err); // 에러 발생 시 콘솔에 출력
    }
  };

  return (
    <Container className="mt-5 w-50 ">
      <div className="text-center">
        <h1>주문서</h1>
        <div id="payment-widget" /> {/* 결제 위젯이 렌더링될 DOM */}
        <Button
          onClick={handlePayment}
          variant="primary"
          block
          className="mt-3 mb-3 w-25"
        >
          결제하기
        </Button>
        &nbsp;
        <Link to={`/mypage/${userData.no}`}>
          <Button variant="secondary" block className="mt-3 mb-3 w-25">
            돌아가기
          </Button>
        </Link>
      </div>
    </Container>
  );
}
