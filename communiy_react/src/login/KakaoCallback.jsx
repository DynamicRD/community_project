import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL 쿼리에서 인가 코드 추출
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (!code) {
      console.error('인가 코드가 없습니다.');
      return;
    }

    // Kakao 토큰 발급 및 백엔드 전달 함수
    const fetchAccessTokenAndSendToBackend = async () => {
      const kakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
      const kakaoRedirectUrl = import.meta.env.VITE_KAKAO_REDIRECT_URL;
      const tokenUrl = 'https://kauth.kakao.com/oauth/token';

      // POST 요청을 위한 URL 인코딩 파라미터 구성
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('client_id', kakaoRestApiKey);
      params.append('redirect_uri', kakaoRedirectUrl);
      params.append('code', code);

      try {
        // Kakao 토큰 요청
        const tokenResponse = await fetch(tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          body: params,
        });

        const tokenData = await tokenResponse.json();
        console.log('Kakao Token Data:', tokenData);

        if (!tokenData.access_token) {
          console.error('Access token이 발급되지 않았습니다.');
          return;
        }
        const accessToken = tokenData.access_token;

        // access token을 콘솔에 출력
        console.log('Access Token:', accessToken);

        // access token을 백엔드로 전달
        const backendResponse = await fetch(
          'http://localhost:8080/member/kakao',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken }),
          }
        );

        const backendData = await backendResponse.json();
        console.log('Backend Response:', backendData);

        // 로그인 성공 후 원하는 경로로 이동 (예: 홈)
        navigate('/');
      } catch (error) {
        console.error('토큰 교환 또는 백엔드 요청 중 에러 발생:', error);
      }
    };

    fetchAccessTokenAndSendToBackend();
  }, [location, navigate]);

  return (
    <div>
      <h2>카카오 로그인을 진행 중입니다...</h2>
    </div>
  );
};

export default KakaoCallback;
