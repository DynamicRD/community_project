import React, { useEffect } from 'react';

export default function GoogleLoginCheck() {
  useEffect(() => {
    const handleGoogleLogin = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const accessToken = queryParams.get('access_token');
      const isNewUser = queryParams.get('is_new_user');
      const googleIdCode = queryParams.get('sub');
      const googleName = queryParams.get('name');
      const googleEmail = queryParams.get('email');

      console.log(accessToken);

      // isNewUser가 'true'이면 회원가입으로 이동
      if (accessToken && isNewUser === 'true') {
        // 토큰과 ID가 성공적으로 받은 경우
        const tokenData = {
          accessToken: accessToken,
          googleIdCode: googleIdCode,
          googleName: googleName,
          googleEmail: googleEmail,
        };

        // 부모 창에 데이터를 전달하고, /test 경로로 이동
        if (window.opener) {
          //const redirectUrl = `/google/signup?access_token=${accessToken}&id=${idToken}`;

          // 부모 창 URL 변경 (이동)
          //window.opener.location.href = window.location.origin + redirectUrl;

          // 팝업 창을 닫기 전에 부모 창을 이동하도록 잠시 기다리기
          setTimeout(() => {
            window.close(); // 팝업 창 닫기
          }, 500); // 500ms 후 닫기 (대기 시간 조정 가능)
        }
      } else if (accessToken && isNewUser === 'false') {
        // 기존 사용자가 있을 때 처리
        if (window.opener) {
          //const redirectUrl = `/test?access_token=${accessToken}&id=${idToken}`;
          //window.opener.location.href = window.location.origin + redirectUrl;

          setTimeout(() => {
            window.close(); // 팝업 창 닫기
          }, 500); // 대기 후 닫기
        }
      }
    };

    handleGoogleLogin(); // 컴포넌트가 마운트될 때 로그인 처리
  }, []); // 컴포넌트가 처음 렌더링될 때 실행

  return <div>Google Login Check</div>;
}
