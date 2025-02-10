import { useEffect, useRef, useState } from 'react';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid'; // nanoid를 사용하여 주문 ID 생성
import { Link, useLocation } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

export default function Checkout() {
  const paymentWidgetRef = useRef(null); // PaymentWidgetInstance를 참조
  const paymentMethodsWidgetRef = useRef(null); // 결제 방법 위젯을 참조
  const location = useLocation(); // useLocation 훅 호출 후 location 사용
  const queryParams = new URLSearchParams(location.search); // location.search를 사용하여 queryParams 생성
  const money = queryParams.get('money');
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
        successUrl: 'http://localhost:5173/mypage/checkout/success',
        failUrl: 'http://localhost:5173/mypage/checkout/fail',
        customerMobilePhone: '01012234123',
      });
    } catch (err) {
      console.log(err); // 에러 발생 시 콘솔에 출력
    }
  };

  return (
    <Container className="mt-5">
      <div className="text-center">
        <h1>주문서</h1>
        <div id="payment-widget" /> {/* 결제 위젯이 렌더링될 DOM */}
        {/* <div>
          <input
            type="checkbox"
            onChange={(event) => {
              // 체크박스 상태에 따라 가격을 조정
              setPrice(event.target.checked ? price - 5000 : price + 5000);
            }}
          />
          <label>5,000원 할인 쿠폰 적용</label>
        </div> */}
        <Button
          onClick={handlePayment}
          variant="primary"
          block
          className="mt-3"
        >
          결제하기
        </Button>
        <Link to="/mypage">
          <Button variant="secondary" block className="mt-3">
            돌아가기
          </Button>
        </Link>
      </div>
    </Container>
  );
}
