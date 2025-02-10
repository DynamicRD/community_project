// import React, { useEffect } from 'react';
// import { Button, Container, Row, Col, Card } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';
// import {
//   loadPaymentWidget,
//   PaymentWidgetInstance,
// } from '@tosspayments/payment-widget-sdk';

// export default function MyAmountCheckout() {
//   const location = useLocation();

//   // 쿼리 파라미터로 전달된 금액 값 받기
//   const queryParams = new URLSearchParams(location.search);
//   const money = queryParams.get('money');

//   useEffect(() => {
//     // TossPayments API 초기화
//     main();
//   }, []);

//   const main = async () => {
//     const button = document.getElementById('payment-button');

//     if (!button) {
//       console.error('payment-button 요소를 찾을 수 없습니다.');
//       return;
//     }

//     const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
//     //const tossPayments = TossPayments(clientKey);

//     // const customerKey = 'G-Gt0xCvJVepMYVHNbZux';
//     // const widgets = tossPayments.widgets({
//     //   customerKey,
//     // });

//     // // 결제 금액 설정
//     // await widgets.setAmount({
//     //   currency: 'KRW',
//     //   value: parseInt(money || 0), // amount는 prop을 통해 전달받음
//     // });

//     // // 결제 UI 및 약관 UI 렌더링
//     // await Promise.all([
//     //   widgets.renderPaymentMethods({
//     //     selector: '#payment-method',
//     //     variantKey: 'DEFAULT',
//     //   }),
//     //   widgets.renderAgreement({
//     //     selector: '#agreement',
//     //     variantKey: 'AGREEMENT',
//     //   }),
//     // ]);

//     // // 결제 버튼 클릭 시 결제 요청
//     // button.addEventListener('click', async () => {
//     //   await widgets.requestPayment({
//     //     orderId: 'lXQylekwmDEh0-o9ZRXhm',
//     //     orderName: '토스 티셔츠 외 2건',
//     //     successUrl: window.location.origin + '/coin/success',
//     //     failUrl: window.location.origin + '/coin/fail',
//     //     customerEmail: 'customer123@gmail.com',
//     //     customerName: '김토스',
//     //     customerMobilePhone: '01012234123',
//     //   });
//     // });
//   };

//   return (
//     <Container className="text-center mt-5">
//       <Row>
//         <Col>
//           <Card>
//             <Card.Header as="h5">결제 정보</Card.Header>
//             <Card.Body>
//               <Card.Title>상품명: 토스 티셔츠 외 2건</Card.Title>
//               <Card.Text>금액: {money ? `${money} 원` : '정보 없음'}</Card.Text>

//               {/* 결제 UI */}
//               <div id="payment-method"></div>

//               {/* 이용약관 UI */}
//               <div id="agreement"></div>

//               {/* 결제 버튼 */}
//               <Button id="payment-button" className="mt-3" variant="success">
//                 결제하기
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
import React from 'react';

export default function MyAmountCheckout() {
  return <div>MyAmountCheckout</div>;
}
