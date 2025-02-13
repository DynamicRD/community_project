import React, { useEffect } from 'react';

export default function GoogleLoginCheck() {
  useEffect(() => {
    const handleGoogleLogin = async () => {
      // URL 파라미터에서 'is_new_user' 확인
      const queryParams = new URLSearchParams(window.location.search);
      const isRegistered = queryParams.get('isRegistered');

      // 'is_new_user' 값에 따라 다르게 처리
      if (isRegistered === 'true') {
        console.log('기존 사용자입니다.');
        const redirectUrl = '/';
        window.opener.location.href = window.location.origin + redirectUrl;
      } else {
        console.log('신규회원입니다.');
        const redirectUrl = '/google/signup'; // 예시로 로그인 페이지로 리디렉션
        window.opener.location.href = window.location.origin + redirectUrl;
      }

      // 팝업 창을 닫기 전에 부모 창에 정보를 전달하고 창을 닫기
      if (window.opener) {
        setTimeout(() => {
          window.close();
        }, 10); // 짧은 시간 후 팝업을 닫는다
      }
    };

    handleGoogleLogin();
  }, []); // 빈 배열을 넣어 컴포넌트가 처음 마운트될 때만 실행되게 함

  return null; // 실제 UI는 필요 없으므로 null 반환
}
