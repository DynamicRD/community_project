import React, { useEffect } from 'react';

export default function GoogleLoginCheck() {
  useEffect(() => {
    const handleGoogleLogin = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const accessToken = queryParams.get('access_token');
      const idToken = queryParams.get('id');
      const isNewUser = queryParams.get('is_new_user');

      console.log(idToken);
      console.log(accessToken);

      //isNewUser가 true면 회원가입으로이동
      if (accessToken && idToken && isNewUser == true) {
        // 토큰과 ID가 성공적으로 받은 경우
        const tokenData = { access_token: accessToken, id: idToken };

        // 부모 창에 데이터를 전달하고, /test 경로로 이동
        if (window.opener) {
          // 부모 창의 URL을 /test로 변경하면서 쿼리 파라미터로 데이터 전달
          const redirectUrl = `/test?access_token=${accessToken}&id=${idToken}`;

          // 부모 창 URL 변경 (이동)
          window.opener.location.href = window.location.origin + redirectUrl;

          window.close(); // 팝업 창 닫기
        }
      } else if (accessToken && idToken && isNewUser == false) {
        // 토큰과 ID가 성공적으로 받은 경우
        const tokenData = { access_token: accessToken, id: idToken };

        // 부모 창에 데이터를 전달하고, /test 경로로 이동
        if (window.opener) {
          // 부모 창의 URL을 /test로 변경하면서 쿼리 파라미터로 데이터 전달
          const redirectUrl = `/test?access_token=${accessToken}&id=${idToken}`;

          // 부모 창 URL 변경 (이동)
          window.opener.location.href = window.location.origin + redirectUrl;

          window.close(); // 팝업 창 닫기
        }
      }
    };

    handleGoogleLogin(); // 컴포넌트가 마운트될 때 로그인 처리
  }, []); // 컴포넌트가 처음 렌더링될 때 실행

  return <div>Google Login Check</div>;
}
